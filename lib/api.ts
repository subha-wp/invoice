import { PrismaClient } from "@prisma/client";
import { Invoice, Estimate, Product, InvoiceItem, EstimateItem } from "@/types";

const prisma = new PrismaClient();

// Invoice functions
export async function getInvoices(): Promise<Invoice[]> {
  return prisma.invoice.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  return prisma.invoice.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function createInvoice(
  data: Omit<Invoice, "id" | "createdAt" | "updatedAt"> & {
    items: Omit<InvoiceItem, "id" | "invoiceId">[];
  }
): Promise<Invoice> {
  return prisma.invoice.create({
    data: {
      ...data,
      items: {
        create: data.items.map((item) => ({
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
}

export async function updateInvoice(
  id: string,
  data: Partial<Omit<Invoice, "id" | "createdAt" | "updatedAt">> & {
    items?: Omit<InvoiceItem, "id" | "invoiceId">[];
  }
): Promise<Invoice> {
  const { items, ...invoiceData } = data;

  await prisma.invoiceItem.deleteMany({
    where: { invoiceId: id },
  });

  return prisma.invoice.update({
    where: { id },
    data: {
      ...invoiceData,
      items: items
        ? {
            create: items.map((item) => ({
              quantity: item.quantity,
              product: { connect: { id: item.productId } },
            })),
          }
        : undefined,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

// Estimate functions
export async function getEstimates(): Promise<Estimate[]> {
  return prisma.estimate.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getEstimate(id: string): Promise<Estimate | null> {
  return prisma.estimate.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function createEstimate(
  data: Omit<Estimate, "id" | "createdAt" | "updatedAt"> & {
    items: Omit<EstimateItem, "id" | "estimateId">[];
  }
): Promise<Estimate> {
  return prisma.estimate.create({
    data: {
      ...data,
      items: {
        create: data.items.map((item) => ({
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
}

export async function updateEstimate(
  id: string,
  data: Partial<Omit<Estimate, "id" | "createdAt" | "updatedAt">> & {
    items?: Omit<EstimateItem, "id" | "estimateId">[];
  }
): Promise<Estimate> {
  const { items, ...estimateData } = data;

  await prisma.estimateItem.deleteMany({
    where: { estimateId: id },
  });

  return prisma.estimate.update({
    where: { id },
    data: {
      ...estimateData,
      items: items
        ? {
            create: items.map((item) => ({
              quantity: item.quantity,
              product: { connect: { id: item.productId } },
            })),
          }
        : undefined,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

// Product functions
export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getProduct(id: string): Promise<Product | null> {
  return prisma.product.findUnique({
    where: { id },
  });
}

export async function createProduct(
  data: Omit<Product, "id">
): Promise<Product> {
  return prisma.product.create({
    data,
  });
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id">>
): Promise<Product> {
  return prisma.product.update({
    where: { id },
    data,
  });
}
