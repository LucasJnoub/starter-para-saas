import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { env } from "process";
import axios from "axios";
const settingsUrl = absoluteUrl("/settings");

export const dynamic = 'force-dynamic'
export async function GET(request: any) {


  try {
    const { userId } = auth();
    const user = await currentUser();
    const { searchParams } = new URL(request.url);
    const isMonthly = searchParams.get("isAnnual") === "true";
    const isBusiness = searchParams.get("isBusiness") === "true"; // Novo parâmetro para verificar se é o plano Business

    if (!userId || !user) return new NextResponse("Unauthorized", { status: 401 });

  

    const userSubscription = await prisma.userSubscritpion.findUnique({
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
            price: isMonthly ?  env.PRICE_ID_BUSINESS_MENSAL : env.PRICE_ID_BUSINESS_ANUAL, 
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
            price: isMonthly ? env.PRICE_ID_PRO_MENSAL : env.PRICE_ID_PRO_ANUAL, 
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
