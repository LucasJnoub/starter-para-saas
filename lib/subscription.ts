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
      credits:true,
    }
  })

  if(!userSubscription) return false;

  const isValid = userSubscription.credits > 0

  return !!isValid;
}
  