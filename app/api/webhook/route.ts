import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Stripe from "stripe";
import { auth,} from "@clerk/nextjs";
import { getAuth} from "@clerk/nextjs/server";
import { clerkClient, } from "@clerk/nextjs";



type Metadata = {
  userId:string;
  credits:string;
  
}

export async function POST(req:Request){
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event : Stripe.Event;

  const {user} = auth();



  let newCreditsOut;
  try{
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string);
  }catch(error:any){
    return new Response(error.message, {status: 400});
  }


  switch(event.type){
    case "checkout.session.completed":
      const completedEvent = event.data.object as Stripe.Checkout.Session & {
        metadata:Metadata;
      };
      const  userId = completedEvent.metadata.userId;
      const  credits = completedEvent.metadata.credits;

      const userBdId = await prisma.user.findUnique({
        where:{
          userId: userId
        }
      })

      if(!userBdId){        
        await prisma.user.create({
          data:{
            userId: userId,
            credits: parseInt(credits),
          }
        })
      }else{
        await prisma.user.update({
          where:{
            userId: userId
          },
          data:{
            credits: {
              increment: parseInt(credits)
            }
          }
        })
      }

      break;
    }
    return new NextResponse(null, { status: 200 });
// 
}