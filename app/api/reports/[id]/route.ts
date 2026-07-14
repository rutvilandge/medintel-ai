import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ONE REPORT
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const report = await prisma.medicalReport.findUnique({
      where: { id },
      include: {
        patient: true,
        analysis: true,
      },
    });

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch report" },
      { status: 500 }
    );
  }
}

// DELETE REPORT
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.medicalReport.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Report deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete report" },
      { status: 500 }
    );
  }
}