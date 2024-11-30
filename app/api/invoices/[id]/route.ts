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
    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: { items: { include: { product: true } } },
    });

    if (!invoice || invoice.userId !== user.id) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json(invoice);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch invoice" },
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
    const { clientName, clientEmail, dueDate, status, items } =
      await request.json();
    const updatedInvoice = await prisma.invoice.update({
      where: { id: params.id, userId: user.id },
      data: {
        clientName,
        clientEmail,
        dueDate: new Date(dueDate),
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
    const total = updatedInvoice.items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
    await prisma.invoice.update({
      where: { id: updatedInvoice.id },
      data: { total },
    });

    return NextResponse.json(updatedInvoice);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update invoice" },
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
    await prisma.invoice.deleteMany({
      where: { id: params.id, userId: user.id },
    });
    return NextResponse.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete invoice" },
      { status: 500 }
    );
  }
}
