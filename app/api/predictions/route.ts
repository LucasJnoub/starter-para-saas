import { NextResponse } from "next/server";
import Replicate from "replicate";
import { auth, currentUser } from "@clerk/nextjs";
import {  decreaseCredit, checkApiLimit } from "@/lib/api-limit";
import { io } from "socket.io-client";


const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  const body = await req.json()
  const prompt = body.prompt;
  const imgUrl = body.imgUrl;
  const {userId} =  auth();
  const user = await currentUser();

  if(!userId || !user) return new NextResponse("Unauthorized", { status: 401 });

  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  if(await checkApiLimit() == false){
    return new NextResponse("No plan", { status: 403 });
  }
  
  try{

    const output = await replicate.run(
      "catacolabs/sdxl-ad-inpaint:9c0cb4c579c54432431d96c70924afcca18983de872e8a221777fb1416253359",
      {
        input: {
        seed: 24603,
        image: imgUrl,
        prompt: prompt,
        img_size: "1024, 1024",
        apply_img: false,
        scheduler: "K_EULER",
        product_fill: "80",
        guidance_scale: 7.5,
        condition_scale: 0.8,
        negative_prompt: "",
        num_refine_steps: 20,
        num_inference_steps: 40
      }
    }
    );
    decreaseCredit();
    return new NextResponse(JSON.stringify(output), { status: 200 });
  }catch(error){
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
  }



