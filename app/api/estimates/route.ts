/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";

export async function GET(request: Request) {
  const { user } = await validateRequest();

  console.log("user", user);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const estimates = await prisma.estimate.findMany({
      where: { userId: user.id },
      include: { items: { include: { product: true } } },
    });
    return NextResponse.json(estimates);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch estimates" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { clientName, clientEmail, expiryDate, items } = await request.json();
    const estimate = await prisma.estimate.create({
      data: {
        number: `EST-${Date.now()}`,
        clientName,
        clientEmail,
        expiryDate: new Date(expiryDate),
        status: "PENDING",
        total: 0, // Calculate total based on items
        userId: user.id,
        items: {
          create: items.map((item: any) => ({
            quantity: item.quantity,
            product: { connect: { id: item.productId } },
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    // Calculate and update total
    const total = estimate.items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
    await prisma.estimate.update({
      where: { id: estimate.id },
      data: { total },
    });

    return NextResponse.json(estimate);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create estimate" },
      { status: 500 }
    );
  }
}
