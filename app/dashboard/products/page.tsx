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

async function ProductsList() {
  const { user } = await validateRequest();
  if (!user) {
    return <div>Please log in to view products.</div>;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
  );

  if (!response.ok) {
    return <div>Failed to load products. Please try again later.</div>;
  }

  const products = await response.json();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product: any) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>${product.price.toFixed(2)}</TableCell>
            <TableCell>
              <Button asChild size="sm">
                <Link href={`/dashboard/products/${product.id}`}>Edit</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <h1 className="text-2xl font-bold my-4">Products</h1>
      <Button asChild className="mb-4">
        <Link href="/dashboard/products/create">Add New Product</Link>
      </Button>
      <div className="overflow-x-auto">
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductsList />
        </Suspense>
      </div>
      <MobileNav />
    </div>
  );
}
