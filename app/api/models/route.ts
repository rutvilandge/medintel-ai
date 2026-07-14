import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function GET() {
  try {
    const response = await ai.models.list();

    return NextResponse.json(response);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}