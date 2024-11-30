/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DocumentView } from "@/components/DocumentView";
import { toast } from "sonner";

export default function PublicEstimateView() {
  const { id } = useParams();
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEstimate() {
      try {
        const response = await fetch(`/api/public/estimates/${id}`);
        if (!response.ok) throw new Error("Failed to fetch estimate");
        const data = await response.json();
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
    <div className="container mx-auto px-4 py-8">
      <DocumentView data={estimate} type="estimate" />
    </div>
  );
}
