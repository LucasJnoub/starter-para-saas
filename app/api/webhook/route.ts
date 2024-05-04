import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Stripe from "stripe";


export async function POST(req:Request){
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event : Stripe.Event;
  let newCreditsOut;
  try{
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string);
  }catch(error:any){
    return new Response(error.message, {status: 400});
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if(event.type === "checkout.session.completed"){
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    
    if (!session?.metadata?.userId) {
      return new Response("Missing userId in session metadata", { status: 400 });
    }
    
    const subscriptionId = session.subscription as string;
    if (!subscriptionId) {
      return new Response("Missing subscription ID", { status: 400 });
    }
    
    
    const user = await prisma.user.findUnique({
      where: {
        userId: session.metadata.userId,
      },
    });

    if(!user){
      return new Response("User not found", {status: 404});
    }

    const newCredits = user.credits + (subscription.items.data[0].price.metadata.credits as unknown as number);
    newCreditsOut = newCredits;

    
    await prisma.user.create({
   
      data:{
        userId: session.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        email: session.metadata.email,
        credits: subscription.items.data[0].price.metadata.credits as unknown as number
      }
    });
  }


  if(event.type === 'invoice.payment_succeeded')
  {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    const subscriptionId = subscription.id;

    if(!subscription) return new NextResponse(null,{status:400})
      // session.subscription as stri
    subscriptionId as string

      await prisma.user.update({
        where:{
          stripeSubscriptionId: subscription.id
        },
        data:{
          stripePriceId:subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          credits:newCreditsOut
        }
      })
  }

  return new NextResponse(null,{status:200})
}