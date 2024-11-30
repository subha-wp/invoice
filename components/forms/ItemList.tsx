import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types";
import { Trash2 } from "lucide-react";

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
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 items-center">
          <Select
            value={item.productId}
            onValueChange={(value) => onUpdateItem(index, "productId", value)}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name} - ₹{product.price.toFixed(2)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
