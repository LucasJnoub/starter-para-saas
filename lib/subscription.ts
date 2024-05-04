import { auth } from "@clerk/nextjs";
import prisma from "./prisma";

const DAY_IN_MS = 86_400_000


export const checkSubscription = async ()=>{
  const {userId} =  auth();

  if(!userId){
    return false;
  }

  const userSubscription = await prisma.user.findUnique({
    where:{
      userId:userId
    },

    select:{
      stripeCurrentPeriodEnd:true,
      stripeCustomerId:true,
      stripeSubscriptionId:true,
      stripePriceId:true  
    }
  })

  if(!userSubscription) return false;

  const isValid = userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
}
  