import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { groq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { patientId, question } = await req.json();

    if (!patientId || !question) {
      return NextResponse.json(
        {
          success: false,
          error: "Patient ID and question are required.",
        },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
      include: {
        reports: {
          include: {
            analysis: true,
          },
          orderBy: {
            uploadedAt: "desc",
          },
        },
        predictions: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!patient) {
      return NextResponse.json(
        {
          success: false,
          error: "Patient not found.",
        },
        { status: 404 }
      );
    }

    const reports = patient.reports
      .map(
        (report) => `
Report Title: ${report.title}
Type: ${report.reportType}
Hospital: ${report.hospital ?? "Unknown"}
Doctor: ${report.doctorName ?? "Unknown"}

AI Summary:
${report.analysis?.summary ?? "No summary"}

Abnormalities:
${report.analysis?.abnormalities ?? "None"}

Recommendations:
${report.analysis?.recommendation ?? "None"}
`
      )
      .join("\n----------------------\n");

    const predictions = patient.predictions
      .map(
        (prediction) => `
Disease: ${prediction.disease}
Probability: ${prediction.probability}%
Risk: ${prediction.risk}

Reasoning:
${prediction.reasoning}

Recommendations:
${prediction.recommendations}
`
      )
      .join("\n----------------------\n");

    const prompt = `
You are MedIntel AI, an experienced medical assistant.

Answer ONLY using the patient's information below.

Patient Information

Name: ${patient.fullName}
Age: ${patient.age}
Gender: ${patient.gender}
Blood Group: ${patient.bloodGroup ?? "Unknown"}

Medical Reports

${reports}

Disease Predictions

${predictions}

Doctor's Question:

${question}

Give a clear, concise and professional medical explanation.
If the information is not available, explicitly say so instead of making it up.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are MedIntel AI, a healthcare assistant that answers only from the provided patient data and does not invent facts.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const answer =
      completion.choices[0]?.message?.content ??
      "No response generated.";

    return NextResponse.json({
      success: true,
      answer,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message ?? "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}