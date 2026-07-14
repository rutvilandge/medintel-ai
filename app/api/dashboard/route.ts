import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      patients,
      reports,
      analyses,
      predictions,
      recentReports,
    ] = await Promise.all([
      prisma.patient.count(),
      prisma.medicalReport.count(),
      prisma.aIAnalysis.count(),
      prisma.prediction.count(),

      prisma.medicalReport.findMany({
        take: 5,
        orderBy: {
          uploadedAt: "desc",
        },
        include: {
          patient: true,
        },
      }),
    ]);

    return NextResponse.json({
      patients,
      reports,
      analyses,
      predictions,
      recentReports,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Dashboard error",
      },
      {
        status: 500,
      }
    );
  }
}