import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET one patient
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const patient = await prisma.patient.findUnique({
    where: {
      id,
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
        error: "Patient not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(patient);
}

// UPDATE patient
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const patient = await prisma.patient.update({
    where: {
      id,
    },
    data: body,
  });

  return NextResponse.json(patient);
}

// DELETE patient
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.patient.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    message: "Patient deleted",
  });
}