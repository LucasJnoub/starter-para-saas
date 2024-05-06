    import { NextResponse } from "next/server";
    import prisma from "@/lib/prisma";
    import { auth } from "@clerk/nextjs/server";

    export async function GET() {
        const { userId } = auth();
        if (!userId) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
      
        try {
          const response = await prisma.user.findUnique({
            where: {
              userId: userId,
            },
            select: {
              credits: true,
            },
          });
      
          if (!response || !response.credits) {
            return new NextResponse(JSON.stringify({ error: "No credits found" }), { status: 404 });
          }
      
          return new NextResponse(JSON.stringify(response.credits), { status: 200 });
        } catch (error) {
          console.error("Error fetching credits:", error);
          return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
        }
      }