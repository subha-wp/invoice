/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoicePDF } from "@/components/invoice-pdf";

import { getEstimate } from "@/lib/services/api";
import { Estimate } from "@/types";
import { toast } from "sonner";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";

export default function EstimateDetail() {
  const { id } = useParams();
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEstimate() {
      try {
        const data = await getEstimate(id as string);
        setEstimate(data);
      } catch (error) {
        toast.error("Failed to fetch estimate details");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchEstimate();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!estimate) {
    return (
      <div className="flex justify-center items-center h-screen">
        Estimate not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-20 pt-4">
      <Link
        href="/dashboard/estimates"
        className="flex items-center text-sm mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Estimates
      </Link>
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Estimate #{estimate.number}</CardTitle>
          <PDFDownloadLink
            document={<InvoicePDF invoice={estimate} />}
            fileName={`estimate-${estimate.number}.pdf`}
          >
            {({ loading }) => (
              <Button size="sm" disabled={loading}>
                <Download className="w-4 h-4 mr-2" />
                {loading ? "Generating..." : "Download PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Business Details</h3>
              <p className="text-sm">{estimate.business.name}</p>
              <p className="text-sm">{estimate.business.address}</p>
              <p className="text-sm">{estimate.business.email}</p>
              <p className="text-sm">{estimate.business.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Client Details</h3>
              <p className="text-sm">Name: {estimate.clientName}</p>
              <p className="text-sm">Email: {estimate.clientEmail}</p>
              <p className="text-sm">
                Expiry Date:{" "}
                {new Date(estimate.expiryDate).toLocaleDateString()}
              </p>
              <p className="text-sm">Status: {estimate.status}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Item</th>
                    <th className="text-right py-2">Qty</th>
                    <th className="text-right py-2">Price</th>
                    <th className="text-right py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {estimate.items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2">{item.product.name}</td>
                      <td className="text-right py-2">{item.quantity}</td>
                      <td className="text-right py-2">
                        ₹{item.product.price.toFixed(2)}
                      </td>
                      <td className="text-right py-2">
                        ₹{(item.quantity * item.product.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="text-right font-semibold py-2">
                      Total:
                    </td>
                    <td className="text-right font-semibold py-2">
                      ₹{estimate.total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {estimate.business.bankName && (
            <div>
              <h3 className="font-semibold mb-2">Payment Details</h3>
              <p className="text-sm">Bank Name: {estimate.business.bankName}</p>
              <p className="text-sm">
                Account No: {estimate.business.accountNo}
              </p>
              <p className="text-sm">IFSC Code: {estimate.business.ifscCode}</p>
              {estimate.business.upiId && (
                <p className="text-sm">UPI ID: {estimate.business.upiId}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
