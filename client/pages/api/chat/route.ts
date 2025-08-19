// export async function GET() {
//     return Response.json({success:true,data:'THANK YOU!'},{status:200})
// }
// export async function POST (request:Request){
//     const {problem,amount}=await request.json()
//     try {
//         const { text:questions } = await generateText({
//             model: google('gemini-2.0-flash-001'),
//             prompt: `Prepare to solve user's tax problem 
//                  the questions should solve a tax ${problem}
//                  the amount of questions required is :${amount}

//             `
//        }) 
//     } catch (error) {
//         console.error(error)
//        return Response.json({success:false,error},{status:500}) 
//     }


// }

// function generateText(arg0: { model: any; prompt: string }): { text: any } | PromiseLike<{ text: any }> {
//     throw new Error("Function not implemented.")
// }
// function google(arg0: string): any {
//     throw new Error("Function not implemented.")
// }

// import { xai } from '@ai-sdk/xai';
// import { streamText, UIMessage, convertToModelMessages } from 'ai';
// import "dotenv/config"
// // import { GoogleGenerativeAI } from '@google/generative-ai';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();

// // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
// // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

//   const result = streamText({
//     model: xai('grok-1.5'),
//        messages: convertToModelMessages(messages),
//     system:`You are a Tax assistant, an intelligent assistant trained on Uganda's tax laws.
// Your goal is to help users understand , calculate and comply with tax  regulations in Uganda . You must follow these rules :
// - You are trained on Uganda tax law.
// - You understand laws on income tax, VAT, corporate tax ,PAYE ,withholding tax,
// local excise and customs duties.
// - Answer clearly and accurately using content from the tax law
// -If calculations are needed, ask for all required info then explain the steps and compute.
// -Give citations by referencing sections/pages from the document if available.
// -Don't guess : If unsure, respond with:' I'm not sure about that. It might require consulting a tax expert or the Uganda Revenue Authority.

// Tone
// -Friendly and professional
// -Avoid legal jargon unless needed
// -Use bullet points or short paragraphs when explaining complex topics

// Avoid
// -Giving information about countries outside Uganda
// -Making up legal advice
// -Speculating or generating fake figures`
//   });

//   return result.toUIMessageStreamResponse();
// }

