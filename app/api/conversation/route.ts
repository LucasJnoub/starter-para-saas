import { GoogleGenerativeAI } from '@google/generative-ai';
import { auth } from "@clerk/nextjs";
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY as any);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new Response("No messages provided", { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = messages.map((message: any) => message.content).join("\n");
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if(!freeTrial && !isPro) return new Response("Free trial has expired", { status: 403});

    const result = await model.generateContent(prompt);
    await increaseApiLimit();
    const response =  result.response;
    const text = response.text();

    return new Response(text);
  } catch (error:any) {
      return new Response(error.message, { status: 500 });
  }
}