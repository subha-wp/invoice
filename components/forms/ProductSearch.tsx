import React, { useState, useEffect } from "react";
import { Command } from "cmdk";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search } from "lucide-react";

interface ProductSearchProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

export function ProductSearch({ products, onSelect }: ProductSearchProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    if (search) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [search, products]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="w-full justify-start text-left font-normal"
      >
        <Search className="mr-2 h-4 w-4" />
        Search products...
      </Button>
      <DialogContent className="p-0">
        <Command className="rounded-lg border shadow-md">
          <div
            className="flex items-center border-b px-3"
            cmdk-input-wrapper=""
          >
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List>
            <Command.Empty>No products found.</Command.Empty>
            {filteredProducts.map((product) => (
              <Command.Item
                key={product.id}
                onSelect={() => {
                  onSelect(product);
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                <div className="flex justify-between w-full">
                  <span>{product.name}</span>
                  <span>₹{product.price.toFixed(2)}</span>
                </div>
                {product.description && (
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                )}
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
