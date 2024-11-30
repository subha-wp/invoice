/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { validateRequest } from "@/lib/auth";

async function InvoicesList() {
  const { user } = await validateRequest();
  if (!user) {
    return <div>Please log in to view invoices.</div>;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/invoices`,
    {
      headers: {
        Cookie: `auth_session=${user.id}`,
      },
    }
  );

  if (!response.ok) {
    return <div>Failed to load invoices. Please try again later.</div>;
  }

  const invoices = await response.json();

  return (
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
        {invoices.map((invoice: any) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.number}</TableCell>
            <TableCell>{invoice.clientName}</TableCell>
            <TableCell>
              {new Date(invoice.dueDate).toLocaleDateString()}
            </TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>${invoice.total.toFixed(2)}</TableCell>
            <TableCell>
              <Button asChild size="sm">
                <Link href={`/dashboard/invoices/${invoice.id}`}>View</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function InvoicesPage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <h1 className="text-2xl font-bold my-4">Invoices</h1>
      <Button asChild className="mb-4">
        <Link href="/dashboard/invoices/create">Create New Invoice</Link>
      </Button>
      <div className="overflow-x-auto">
        <Suspense fallback={<div>Loading invoices...</div>}>
          <InvoicesList />
        </Suspense>
      </div>
      <MobileNav />
    </div>
  );
}
