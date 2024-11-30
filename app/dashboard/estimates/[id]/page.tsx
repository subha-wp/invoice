/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getEstimate } from "@/lib/services/api";
import { Estimate } from "@/types";
import { toast } from "sonner";

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
    return <div>Loading...</div>;
  }

  if (!estimate) {
    return <div>Estimate not found</div>;
  }

  return (
    <div className="container mx-auto px-4 pb-20">
      <h1 className="text-2xl font-bold my-4">Estimate Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Estimate #{estimate.number}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Business Details</h3>
              <p>{estimate.business.name}</p>
              <p>{estimate.business.address}</p>
              <p>{estimate.business.email}</p>
              <p>{estimate.business.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold">Client Details</h3>
              <p>Name: {estimate.clientName}</p>
              <p>Email: {estimate.clientEmail}</p>
              <p>
                Expiry Date:{" "}
                {new Date(estimate.expiryDate).toLocaleDateString()}
              </p>
              <p>Status: {estimate.status}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Items</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Item</th>
                  <th className="text-right">Quantity</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {estimate.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product.name}</td>
                    <td className="text-right">{item.quantity}</td>
                    <td className="text-right">
                      ₹{item.product.price.toFixed(2)}
                    </td>
                    <td className="text-right">
                      ₹{(item.quantity * item.product.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-right font-semibold">
                    Total:
                  </td>
                  <td className="text-right font-semibold">
                    ₹{estimate.total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {estimate.business.bankName && (
            <div>
              <h3 className="font-semibold mb-2">Payment Details</h3>
              <p>Bank Name: {estimate.business.bankName}</p>
              <p>Account No: {estimate.business.accountNo}</p>
              <p>IFSC Code: {estimate.business.ifscCode}</p>
              {estimate.business.upiId && (
                <p>UPI ID: {estimate.business.upiId}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
