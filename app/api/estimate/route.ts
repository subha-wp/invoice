import { NextResponse } from "next/server";
import { getEstimates, createEstimate } from "@/lib/api";

export async function GET() {
  try {
    const estimates = await getEstimates();
    return NextResponse.json(estimates);
  } catch (error) {
    console.error("Error fetching estimates:", error);
    return NextResponse.json(
      { error: "Error fetching estimates" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const estimate = await createEstimate(data);
    return NextResponse.json(estimate);
  } catch (error) {
    console.error("Error creating estimate:", error);
    return NextResponse.json(
      { error: "Error creating estimate" },
      { status: 500 }
    );
  }
}
