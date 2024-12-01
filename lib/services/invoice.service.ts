import prisma from "@/lib/prisma";
import { User } from "@/types";

export async function createInvoice({
  clientName,
  clientEmail,
  clientAddress,
  additionalAddress,
  dueDate,
  items,
  businessId,
  user,
}: {
  clientName: string;
  clientEmail: string;
  clientAddress?: string;
  additionalAddress?: string;
  dueDate: string;
  items: Array<{ productId: string; quantity: number }>;
  businessId: string;
  user: User;
}) {
  const invoice = await prisma.invoice.create({
    data: {
      number: `INV-${Date.now()}`,
      clientName,
      clientEmail,
      clientAddress,
      additionalAddress,
      dueDate: new Date(dueDate),
      status: "PENDING",
      total: 0,
      userId: user.id,
      businessId,
      items: {
        create: items.map((item) => ({
          quantity: item.quantity,
          product: { connect: { id: item.productId } },
        })),
      },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  // Calculate total
  const total = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  // Update invoice with calculated total
  return prisma.invoice.update({
    where: { id: invoice.id },
    data: { total },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      business: true,
    },
  });
}
