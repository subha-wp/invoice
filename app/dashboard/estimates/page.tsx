/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { useEstimates } from "@/lib/hooks/useEstimates";

export default function EstimatesPage() {
  const { estimates, loading } = useEstimates();

  if (loading) {
    return <div>Loading estimates...</div>;
  }

  return (
    <div className="container mx-auto px-4 pb-20">
      <h1 className="text-2xl font-bold my-4">Estimates</h1>
      <Button asChild className="mb-4">
        <Link href="/dashboard/estimates/create">Create New Estimate</Link>
      </Button>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Number</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {estimates.map((estimate) => (
              <TableRow key={estimate.id}>
                <TableCell>{estimate.number}</TableCell>
                <TableCell>{estimate.clientName}</TableCell>
                <TableCell>
                  {new Date(estimate.expiryDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{estimate.status}</TableCell>
                <TableCell>${estimate.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button asChild size="sm">
                    <Link href={`/dashboard/estimates/${estimate.id}`}>
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <MobileNav />
    </div>
  );
}
