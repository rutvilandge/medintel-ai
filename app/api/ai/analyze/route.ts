 import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { groq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { reportId } = await req.json();

    if (!reportId) {
      return NextResponse.json(
        {
          success: false,
          error: "Report ID is required",
        },
        { status: 400 }
      );
    }

    const report = await prisma.medicalReport.findUnique({
      where: {
        id: reportId,
      },
    });

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          error: "Report not found",
        },
        { status: 404 }
      );
    }

    const prompt = `
You are an experienced medical AI assistant.

Analyze the following medical report and return ONLY this exact format.

Summary:
...

Abnormalities:
...

Recommendations:
...

Medical Report

Title: ${report.title}

Report Type: ${report.reportType}

Hospital: ${report.hospital ?? "Unknown"}

Doctor: ${report.doctorName ?? "Unknown"}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a professional medical AI assistant that summarizes medical reports.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const text = completion.choices[0]?.message?.content ?? "";

   const summary =
  text.match(/Summary:([\s\S]*?)Abnormalities:/i)?.[1]?.trim() ??
  "No summary available.";
   
    const abnormalities =
  text.match(/Abnormalities:([\s\S]*?)Recommendations:/i)?.[1]?.trim() ??
  "None";
   
    const recommendation =
      text.split(/Recommendations:/i)[1]?.trim() ??
      "No recommendation.";

    const analysis = await prisma.aIAnalysis.upsert({
      where: {
        reportId: report.id,
      },
      update: {
        summary,
        abnormalities,
        recommendation,
      },
      create: {
        reportId: report.id,
        summary,
        abnormalities,
        recommendation,
      },
    });

    await prisma.medicalReport.update({
      where: {
        id: report.id,
      },
      data: {
        status: "Analyzed",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Analysis completed successfully",
      analysis,
    });
  } catch (err: any) {
    console.error("Groq Error:", err);

    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Unknown server error",
      },
      { status: 500 }
    );
  }
}
