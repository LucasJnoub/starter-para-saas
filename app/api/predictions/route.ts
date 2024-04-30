// app/api/predictions/route.ts
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  const data = await req.formData();
  const prompt = data.get("prompt")?.toString();

  const input = {
    seed: 24603,
    image: "https://replicate.delivery/pbxt/JX7yjB7jAgeCC1tUmWUUZlWg3IDWW9vLqIjwqWOlj9p6zyyn/sofa.png",
    prompt: "a modern sofa in a contemporary living room, stylish decor",
    apply_img: false,
    product_fill: "80",
    condition_scale: 0.8,
    negative_prompt: "",
    num_refine_steps: 20
};


  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  // const prediction = await replicate.predictions.create({
  //   version: "9c0cb4c579c54432431d96c70924afcca18983de872e8a221777fb1416253359",
  //   input: { prompt },
  // });

  const prediction = await replicate.run("catacolabs/sdxl-ad-inpaint:9c0cb4c579c54432431d96c70924afcca18983de872e8a221777fb1416253359", { input });


  if (prediction?.error) {
    return new Response(JSON.stringify({ detail: prediction.error.detail }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(prediction), { status: 201 });
}

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const prediction = await replicate.predictions.get(params.id);

//   if (prediction?.error) {
//     return new Response(JSON.stringify({ detail: prediction.error.detail }), {
//       status: 500,
//     });
//   }

//   return new Response(JSON.stringify(prediction), { status: 200 });
// }
export async function GET(
  request: Request
) {
  const prediction = await replicate.predictions.list();

  if (prediction?.error) {
    return new Response(JSON.stringify({ detail: prediction.error.detail }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(prediction), { status: 200 });
}