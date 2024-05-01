import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const replicateUrl = body.replicateUrl;
    
    const {userId} = auth();

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
        updatedAt: new Date(),
      }
    })

    return new NextResponse("OK", { status: 200 });

}