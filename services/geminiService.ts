
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function getStyleAdvice(history: Message[]): Promise<string> {
  try {
    const chat = ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history.map(h => ({
        role: h.role === 'model' ? 'model' : 'user',
        parts: [{ text: h.text }]
      })),
      config: {
        systemInstruction: `You are the Supernova AI Style Assistant. Your brand is "Supernova", known for cosmic, futuristic, and high-performance footwear. 
        Your tone is professional, futuristic, and enthusiastic. 
        You help customers find the right shoes from the "Supernova" collection based on their needs (running, style, comfort). 
        Mention specific models like Nebula X1, Pulsar Runner, or Quasar Street when appropriate. 
        Keep responses concise and helpful.`,
      }
    });

    const result = await chat;
    return result.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The stars are currently misaligned. Please try again in a moment.";
  }
}

export async function generateProductPitch(productName: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a 2-sentence high-energy marketing pitch for a shoe called "${productName}" from the Supernova brand. Focus on futuristic performance and cosmic style.`,
    });
    return response.text || "";
  } catch (error) {
    return "Reach for the stars with Supernova performance.";
  }
}
