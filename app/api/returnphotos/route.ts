import prisma from "@/lib/prisma";
import {auth, currentUser} from "@clerk/nextjs";
import {NextResponse} from "next/server";

export async function GET(request: Request) {

    const {userId} = auth();
    const user = await currentUser();

    if(!userId || !user) return new NextResponse("Unauthorized", { status: 401 });

    const getUserPhotos = await prisma.replicateUrl.findFirst({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return new NextResponse(JSON.stringify(getUserPhotos), { status: 200 });
}