import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";
const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
});

export async function generateSummaryFromOpenAI(pdfText: string) {
  try {
    const completion = await openai.chat.completions.create({
    //   model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
      // model: 'meta-llama/llama-4-scout-17b-16e-instruct:free',
    //   model: 'google/gemini-2.0-flash-exp:free',
    //   model: 'mistralai/devstral-small-2505:free',
      model: 'microsoft/mai-ds-r1:free',
      messages: [
        {
          role: "system",
          content: SUMMARY_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summary with 
            contextually relevant emojis and proper markdown formatting:\n\n ${pdfText}`,
        },
      ],
      temperature: 0.7,
      max_completion_tokens: 1500,
    });

    return completion.choices[0].message.content;
  } catch (error: any) {

    if(error?.status === 429){
        throw new Error("RATE_LIMIT_EXCEEDED");
    }
    throw error;
  }
}
