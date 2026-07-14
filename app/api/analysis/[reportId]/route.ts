import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ reportId: string }> }
) {
  const { reportId } = await params;

  const analysis = await prisma.aIAnalysis.findUnique({
    where: {
      reportId,
    },
  });

  if (!analysis) {
    return NextResponse.json(
      {
        success: false,
        error: "Analysis not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    analysis,
  });
}