export interface User {
  id: string;
  email: string;
  name: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  userId: string;
}

export interface Invoice {
  id: string;
  number: string;
  clientName: string;
  clientEmail: string;
  dueDate: Date;
  status: string;
  total: number;
  userId: string;
  items: InvoiceItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  id: string;
  quantity: number;
  productId: string;
  product: Product;
  invoiceId: string;
}

export interface Estimate {
  id: string;
  number: string;
  clientName: string;
  clientEmail: string;
  expiryDate: Date;
  status: string;
  total: number;
  userId: string;
  items: EstimateItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EstimateItem {
  id: string;
  quantity: number;
  productId: string;
  product: Product;
  estimateId: string;
}
