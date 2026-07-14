import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function GET() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Say hello from MedIntel AI",
    });

    return NextResponse.json({
      success: true,
      response: response.text,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: error.message,
      status: error.status,
      details: error,
    });
  }
}