import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { env } from "process";

const settingsUrl = absoluteUrl("/settings");

export async function GET(request: any) {

  // const proMensal = env.NEXT_PUBLIC_PRO_MENSAL;

  try {
    const { userId } = auth();
    const user = await currentUser();
    const { searchParams } = new URL(request.url);
    const isMonthly = searchParams.get("isAnnual") === "true";
    const isBusiness = searchParams.get("isBusiness") === "true"; // Novo parâmetro para verificar se é o plano Business

    if (!userId || !user) return new NextResponse("Unauthorized", { status: 401 });

    const userSubscription = await prismadb.userSubscritpion.findUnique({
      where: {
        userId,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    let stripeSession;

    if (isBusiness) {
      stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            // price_data: {
            //   currency: "USD",
            //   product_data: {
            //     name: isMonthly?"Genius Business Monthly": "Genius Business Yearly",
            //     description: "For large organizations with extensive social media needs",
            //   },
            //   unit_amount: isMonthly ? 5000: 50000, // Preço do plano Business
            //   recurring: {
            //     interval: isMonthly ? "month" : "year",
            //   },
            price: isMonthly ?  env.PRICE_ID_BUSINESS_MENSAL : env.PRICE_ID_BUSINESS_ANUAL, // Substitua com o ID do preço real
            quantity: 1,
            },
        ],
        metadata: {
          userId,
        },
      });
    } else {
      stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            // price_data: { 
            //   currency: "USD",
            //   product_data: {
            //     name: isMonthly ? "Genius Pro Monthly" : "Genius Pro yearly",
            //     description: "Unlimited AI Generations",
            //   },
            //   unit_amount: isMonthly ? 1800 : 18000,
            //   recurring: {
            //     interval: isMonthly ? "month" : "year",
            //   },
            // }, 
            // quantity: 1,
            price: isMonthly ? env.PRICE_ID_PRO_MENSAL : env.PRICE_ID_PRO_ANUAL, // Substitua com o ID do preço real
            quantity: 1,
          },
        ],
        metadata: {
          userId,
        },
      });
    }

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
