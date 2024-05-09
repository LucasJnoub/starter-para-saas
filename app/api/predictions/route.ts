import { NextResponse } from "next/server";
import Replicate from "replicate";
import { auth, currentUser } from "@clerk/nextjs";
import {  decreaseCredit, checkApiLimit, checkCredit } from "@/lib/api-limit";

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
      "logerzhu/ad-inpaint:b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df",
      {
        input: {
        // seed: 24603,
        // image: imgUrl,
        // prompt: prompt,
        // img_size: "1024, 1024" ,
        // apply_img: true,
        // scheduler: "K_EULER",
        // product_fill: "80",
        // guidance_scale: 7.5,
        // condition_scale: 0.8,
        // negative_prompt: "",
        // num_refine_steps: 20,
        // num_inference_steps: 40
        pixel: "512 * 512",
        scale: 3,
        prompt: prompt,
        image_num: 1,
        image_path: imgUrl,
        manual_seed: -1,
        product_size: "0.5 * width",
        guidance_scale: 7.5,
        negative_prompt: "illustration, 3d, sepia, painting, cartoons, sketch, (worst quality:2)",
        num_inference_steps: 20
      }
    }
    );
    decreaseCredit();
    const credit = checkCredit()
    return new NextResponse(JSON.stringify({ output, credit }), { status: 200 });
  }catch(error){
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
  }



