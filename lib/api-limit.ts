import {auth} from "@clerk/nextjs"
import prisma from "./prisma"
import { MAX_FREE_COUNTS } from "@/constants"

export const decreaseCredit =  async ()=>{
  const {userId} = auth()
  if(!userId) return;

  const user = await prisma.user.findUnique({
    where:{
      userId
    }
  })

  if(user){
    await prisma.user.update({
      where:{
        userId:userId
      },
      data:{
        credits:{
          decrement:1
        }
      } 
    })  }

  }



export const checkApiLimit = async () => {
  const {userId} = auth();
   
  if(!userId) return false;

  const userApiLimit = await prisma.user.findUnique({
    where:{
      userId:userId
    }
  })


if (userApiLimit && userApiLimit.credits  > 0){
  return true;
}else{
  return false;
}
}



export const checkCredit = async () => {
  const {userId} = auth();
  if(!userId) return null;
  const user = await prisma.user.findUnique({
      where: {
          userId: userId,
      },
  });
  return user?.credits;
}