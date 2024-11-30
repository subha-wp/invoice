/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoicePDF } from "@/components/invoice-pdf";
import { Download } from "lucide-react";

interface DocumentViewProps {
  data: any;
  type: "invoice" | "estimate";
}

export function DocumentView({ data, type }: DocumentViewProps) {
  if (!data) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">
          {type === "invoice" ? "Invoice" : "Estimate"} #{data.number}
        </CardTitle>
        <PDFDownloadLink
          document={<InvoicePDF invoice={data} />}
          fileName={`${type}-${data.number}.pdf`}
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
            <p className="text-sm">{data.business.name}</p>
            <p className="text-sm">{data.business.address}</p>
            <p className="text-sm">{data.business.email}</p>
            <p className="text-sm">{data.business.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Client Details</h3>
            <p className="text-sm">Name: {data.clientName}</p>
            <p className="text-sm">Email: {data.clientEmail}</p>
            <p className="text-sm">
              {type === "invoice" ? "Due" : "Expiry"} Date:{" "}
              {new Date(
                type === "invoice" ? data.dueDate : data.expiryDate
              ).toLocaleDateString()}
            </p>
            <p className="text-sm">Status: {data.status}</p>
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
                {data.items.map((item: any) => (
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
                    ₹{data.total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {data.business.bankName && (
          <div>
            <h3 className="font-semibold mb-2">Payment Details</h3>
            <p className="text-sm">Bank Name: {data.business.bankName}</p>
            <p className="text-sm">Account No: {data.business.accountNo}</p>
            <p className="text-sm">IFSC Code: {data.business.ifscCode}</p>
            {data.business.upiId && (
              <p className="text-sm">UPI ID: {data.business.upiId}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
