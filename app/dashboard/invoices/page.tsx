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
import { getInvoices } from "@/lib/api";

async function InvoicesList() {
  const invoices = await getInvoices();

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
        {invoices.map((invoice) => (
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
                <Link href={`/invoices/${invoice.id}`}>View</Link>
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
        <Link href="/invoices/create">Create New Invoice</Link>
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
