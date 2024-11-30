/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const estimate = await prisma.estimate.findUnique({
      where: { id: params.id },
      include: { items: { include: { product: true } } },
    });

    if (!estimate || estimate.userId !== user.id) {
      return NextResponse.json(
        { error: "Estimate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(estimate);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch estimate" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { clientName, clientEmail, expiryDate, status, items } =
      await request.json();
    const updatedEstimate = await prisma.estimate.update({
      where: { id: params.id, userId: user.id },
      data: {
        clientName,
        clientEmail,
        expiryDate: new Date(expiryDate),
        status,
        items: {
          deleteMany: {},
          create: items.map((item: any) => ({
            quantity: item.quantity,
            product: { connect: { id: item.productId } },
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    // Recalculate total
    const total = updatedEstimate.items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
    await prisma.estimate.update({
      where: { id: updatedEstimate.id },
      data: { total },
    });

    return NextResponse.json(updatedEstimate);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update estimate" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.estimate.deleteMany({
      where: { id: params.id, userId: user.id },
    });
    return NextResponse.json({ message: "Estimate deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete estimate" },
      { status: 500 }
    );
  }
}
