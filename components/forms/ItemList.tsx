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

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 items-start">
          <div className="flex-1">
            <ProductSearch
              products={products}
              onSelect={(product) =>
                onUpdateItem(index, "productId", product.id)
              }
            />
            {item.productId && (
              <div className="mt-1 text-sm text-muted-foreground">
                Selected: {getProductById(item.productId)?.name} - ₹
                {getProductById(item.productId)?.price.toFixed(2)}
              </div>
            )}
          </div>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              onUpdateItem(index, "quantity", parseInt(e.target.value))
            }
            min="1"
            className="w-24"
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
      ))}
      <Button type="button" onClick={onAddItem} className="w-full">
        Add Item
      </Button>
    </div>
  );
}
