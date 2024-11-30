import { NextResponse } from "next/server";
import { getEstimate, updateEstimate } from "@/lib/api";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const estimate = await getEstimate(params.id);
    if (!estimate) {
      return NextResponse.json(
        { error: "Estimate not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(estimate);
  } catch (error) {
    console.error("Error fetching estimate:", error);
    return NextResponse.json(
      { error: "Error fetching estimate" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const estimate = await updateEstimate(params.id, data);
    return NextResponse.json(estimate);
  } catch (error) {
    console.error("Error updating estimate:", error);
    return NextResponse.json(
      { error: "Error updating estimate" },
      { status: 500 }
    );
  }
}
