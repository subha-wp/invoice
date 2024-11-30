import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileNav } from "@/components/mobile-nav";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto px-4 pb-20">
        <h1 className="text-2xl font-bold my-4">Dashboard</h1>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button asChild>
                <Link href="/invoices/create">Create Invoice</Link>
              </Button>
              <Button asChild>
                <Link href="/estimates/create">Create Estimate</Link>
              </Button>
              <Button asChild>
                <Link href="/products/create">Add Product</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add recent invoices/estimates here */}
              <p>No recent activity</p>
            </CardContent>
          </Card>
        </div>
        <MobileNav />
      </div>
    </div>
  );
}
