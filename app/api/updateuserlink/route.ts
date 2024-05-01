import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser, auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const user = await currentUser();
  const { userId } = auth();
  const { photoUrl } = await req.json(); 

  if (!userId || !user) return new NextResponse("Unauthorized", { status: 401 });


  if (!photoUrl) return new NextResponse("Photo URL is required", { status: 400 });

  const updateUser = await prisma.photoLink.create({    
    data: {
      userId: userId,
      url: photoUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return new NextResponse("OK", { status: 200 });
}