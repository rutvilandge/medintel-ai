import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { groq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { patientId } = await req.json();

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
      },
    });

    if (!patient) {
      return NextResponse.json(
        {
          success: false,
          error: "Patient not found",
        },
        { status: 404 }
      );
    }

    const reportsText =
      patient.reports.length === 0
        ? "No reports uploaded."
        : patient.reports
            .map((report) => {
              return `
Report Title: ${report.title}
Report Type: ${report.reportType}
Hospital: ${report.hospital ?? "Unknown"}
Doctor: ${report.doctorName ?? "Unknown"}

AI Summary:
${report.analysis?.summary ?? "No AI summary"}

Abnormalities:
${report.analysis?.abnormalities ?? "None"}

Recommendations:
${report.analysis?.recommendation ?? "None"}
`;
            })
            .join("\n----------------------\n");

    const prompt = `
You are an experienced medical AI assistant.

Analyze the patient's information and estimate the MOST LIKELY disease risk.

Patient Information

Name: ${patient.fullName}
Age: ${patient.age}
Gender: ${patient.gender}
Blood Group: ${patient.bloodGroup ?? "Unknown"}

Medical Reports

${reportsText}

Return ONLY valid JSON.

{
"disease":"",
"probability":85,
"risk":"Low/Medium/High",
"reasoning":"",
"recommendations":""
}

Probability must be between 0 and 100.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content:
            "You are a medical AI that always returns valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No response from Groq");
    }

    const result = JSON.parse(content);

    const prediction = await prisma.prediction.create({
      data: {
        patientId: patient.id,
        disease: result.disease,
        probability: Number(result.probability),
        risk: result.risk,
        reasoning: result.reasoning,
        recommendations: result.recommendations,
      },
    });

    return NextResponse.json({
      success: true,
      prediction,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}