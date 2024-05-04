import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { env } from "process";
import { clerkClient } from "@clerk/nextjs";

const settingsUrl = absoluteUrl("/settings");

export async function GET(request: any) {
  let credits 
  let priceId 
  const plan = request.nextUrl.searchParams.get("plan");
  try {
    
    if(plan === "i"){
      priceId = process.env.PACOTE_INICIAL
      credits =7;
    }
    if(plan === "p"){
      priceId = process.env.PACOTE_PROFISSIONAL
      credits = 10;
    }
    if(plan === "pr"){
      priceId = process.env.PACOTE_PREMIUM
      credits = 50
    }
    const { userId, sessionId } = auth();
    const user = await currentUser();

    if (!sessionId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const session = await clerkClient.sessions.getSession(sessionId);

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if(!credits || !priceId) return new NextResponse("Unauthorized", { status: 401 });  
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      metadata: {
        userId: session.userId,
        credits: credits,
      },
      line_items: [
        { 
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: settingsUrl,
      cancel_url: settingsUrl,
    });

    return new NextResponse(JSON.stringify(checkoutSession), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse("Error creating checkout session", { status: 500 });
  }
}