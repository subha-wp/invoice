import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types";
import { Trash2 } from "lucide-react";
import { ProductSearch } from "./ProductSearch";

interface ItemListProps {
  items: Array<{ productId: string; quantity: number }>;
  products: Product[];
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onUpdateItem: (index: number, field: string, value: string | number) => void;
}

export function ItemList({
  items,
  products,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
}: ItemListProps) {
  const getProductById = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  const calculateItemTotal = (item: {
    productId: string;
    quantity: number;
  }) => {
    const product = getProductById(item.productId);
    if (!product) return 0;
    const subtotal = product.price * item.quantity;
    const tax = (subtotal * product.taxPercent) / 100;
    return subtotal + tax;
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="space-y-2 border rounded-lg p-2">
          <div className="flex gap-2 items-start">
            <div className="flex-1">
              <ProductSearch
                products={products}
                onSelect={(product) =>
                  onUpdateItem(index, "productId", product.id)
                }
              />
              {item.productId && (
                <div className="mt-2 space-y-1">
                  <div className="text-sm">
                    <span className="font-medium">
                      {getProductById(item.productId)?.name}
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      ₹{getProductById(item.productId)?.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span>
                      Tax: {getProductById(item.productId)?.taxPercent}%
                    </span>
                    <span className="mx-2">•</span>
                    <span>Unit: {getProductById(item.productId)?.unit}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  onUpdateItem(index, "quantity", parseInt(e.target.value))
                }
                min="1"
                className="w-14"
                required
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => onRemoveItem(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {item.productId && (
            <div className="text-sm text-right text-muted-foreground">
              Total (inc. tax): ₹{calculateItemTotal(item).toFixed(2)}
            </div>
          )}
        </div>
      ))}
      <Button type="button" onClick={onAddItem} className="w-full">
        Add Item
      </Button>
    </div>
  );
}
