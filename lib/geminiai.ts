import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenAI } from "@google/genai";

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: `${SUMMARY_SYSTEM_PROMPT}

Transform this document into an engaging, easy-to-read summary with emojis and markdown:

${pdfText}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    if(!response.text){
        throw new Error("Empty Response from Gemini API");
    }

    return response.text;
  } catch (error: any) {

    console.error("Gemini API Error:", error);
    throw error;
  }
};
