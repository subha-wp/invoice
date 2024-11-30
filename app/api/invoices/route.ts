/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";

export async function GET(request: Request) {
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const invoices = await prisma.invoice.findMany({
      where: { userId: user.id },
      include: { items: { include: { product: true } } },
    });
    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
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
    const { clientName, clientEmail, dueDate, items } = await request.json();
    const invoice = await prisma.invoice.create({
      data: {
        number: `INV-${Date.now()}`,
        clientName,
        clientEmail,
        dueDate: new Date(dueDate),
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
    const total = invoice.items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
    await prisma.invoice.update({
      where: { id: invoice.id },
      data: { total },
    });

    return NextResponse.json(invoice);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 }
    );
  }
}
