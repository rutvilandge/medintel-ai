import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(patients);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const patient = await prisma.patient.create({
      data: {
        fullName: body.fullName,
        age: Number(body.age),
        gender: body.gender,
        phone: body.phone,
        email: body.email,
        bloodGroup: body.bloodGroup,
        address: body.address,
      },
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
  }
}