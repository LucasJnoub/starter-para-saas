import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export async function updatePredictionUrl(replicateUri:any) {
    const replicateUrl = replicateUri.data.output[1];
    const {userId} = auth();


    // const checkUserSubscription:any = axios.get('/checksubscription');
    // if (checkUserSubscription?.response?.status === 403) return new NextResponse("Forbidden", { status: 403 });

    if(!userId || !currentUser) return new NextResponse("Unauthorized", { status: 401 });


    if (!replicateUrl) {
        console.error("replicateUrl não está definido corretamente:", replicateUrl);
        return new NextResponse("Bad Request", { status: 400 });
      }


    const create = await prisma.replicateUrl.create({
      data:{
        userId: userId,
        url: replicateUrl,
        createdAt: new Date(),
      }
    })

    return new NextResponse("OK", { status: 200 });

}