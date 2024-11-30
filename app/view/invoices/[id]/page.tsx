/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DocumentView } from "@/components/DocumentView";
import { toast } from "sonner";

export default function PublicInvoiceView() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvoice() {
      try {
        const response = await fetch(`/api/public/invoices/${id}`);
        if (!response.ok) throw new Error("Failed to fetch invoice");
        const data = await response.json();
        setInvoice(data);
      } catch (error) {
        toast.error("Failed to fetch invoice details");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchInvoice();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex justify-center items-center h-screen">
        Invoice not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DocumentView data={invoice} type="invoice" />
    </div>
  );
}
