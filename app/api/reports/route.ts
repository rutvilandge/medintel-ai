
        import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const reports = await prisma.medicalReport.findMany({
  include: {
    patient: true,
    analysis: true,
  },
  orderBy: {
    uploadedAt: "desc",
  },
});
    return NextResponse.json(reports);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}
