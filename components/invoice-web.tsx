/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Invoice } from "@/types";

export function InvoiceWeb({ invoice }: { invoice: Invoice }) {
  return (
    <Card className="w-full max-w-4xl mx-auto my-4 p-8 bg-white shadow-lg">
      <CardHeader className="flex flex-row justify-between items-start pb-3 px-0">
        <div className="flex flex-col">
          {invoice.business?.logoUrl && (
            <img
              src={invoice.business.logoUrl}
              alt="Business Logo"
              className="w-32 h-32 object-contain mb-4"
            />
          )}
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              {invoice.business?.name}
            </p>
            <p>{invoice.business?.address}</p>
            <p>{invoice.business?.email}</p>
            <p>{invoice.business?.phone}</p>
          </div>
        </div>
        <div className="text-right">
          <CardTitle className="text-3xl font-bold text-primary mb-2">
            Invoice
          </CardTitle>
          <p className="text-xl font-medium text-muted-foreground mb-1">
            #{invoice.number}
          </p>
          <div className="space-y-1 text-sm">
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</p>
          </div>
        </div>
      </CardHeader>

      <Separator className="my-2" />

      <CardContent className="px-0">
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Bill To</h3>
          <div className="space-y-1 text-sm">
            <p className="font-medium">{invoice.clientName}</p>
            <p>{invoice.clientEmail}</p>
            {invoice.clientAddress && <p>{invoice.clientAddress}</p>}
            {invoice.additionalAddress && <p>{invoice.additionalAddress}</p>}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="font-semibold">Item</TableHead>
              <TableHead className="font-semibold text-right">
                Quantity
              </TableHead>
              <TableHead className="font-semibold text-right">Price</TableHead>
              <TableHead className="font-semibold text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.product.name}
                </TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  ₹{item.product.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  ₹{(item.quantity * item.product.price).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-6 flex justify-end">
          <div className="w-1/2 space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal:</span>
              <span>₹{invoice.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tax:</span>
              <span>₹0.00</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>₹{invoice.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {invoice.business?.bankName && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-1 pl-2">Payment Details</h3>
            <Card className="bg-muted max-w-fit">
              <CardContent className="p-4 space-y-2 text-sm ">
                <p>
                  <span className="font-medium">Bank Name:</span>{" "}
                  {invoice.business.bankName}
                </p>
                <p>
                  <span className="font-medium">Account No:</span>{" "}
                  {invoice.business.accountNo}
                </p>
                <p>
                  <span className="font-medium">IFSC Code:</span>{" "}
                  {invoice.business.ifscCode}
                </p>
                {invoice.business.upiId && (
                  <p>
                    <span className="font-medium">UPI ID:</span>{" "}
                    {invoice.business.upiId}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-12 text-right">
          <div className="inline-block border-t border-muted-foreground pt-2">
            <p className="text-sm font-medium">Authorized Signature</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
