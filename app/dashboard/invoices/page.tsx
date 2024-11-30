/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInvoices } from "@/lib/hooks/useInvoices";

export default function InvoicesPage() {
  const { invoices, loading } = useInvoices();

  if (loading) {
    return <div>Loading invoices...</div>;
  }

  return (
    <div className="container mx-auto px-4 pb-20">
      <h1 className="text-2xl font-bold my-4">Invoices</h1>
      <Button asChild className="mb-4">
        <Link href="/dashboard/invoices/create">Create New Invoice</Link>
      </Button>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Number</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.number}</TableCell>
                <TableCell>{invoice.clientName}</TableCell>
                <TableCell>
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>₹{invoice.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button asChild size="sm">
                    <Link href={`/dashboard/invoices/${invoice.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
