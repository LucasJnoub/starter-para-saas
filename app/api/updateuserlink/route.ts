import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser, auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const user = await currentUser();
  const { userId } = auth();

  if (!userId || !user) return new NextResponse("Unauthorized", { status: 401 });

  const { photoUrl } = await req.json(); 

  if (!photoUrl) return new NextResponse("Photo URL is required", { status: 400 });

  const updateUser = await prismadb.photoLink.create({    
    data: {
      userId: userId,
      url: photoUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return new NextResponse("OK", { status: 200 });
}