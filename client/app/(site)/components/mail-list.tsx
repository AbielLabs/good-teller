import { ComponentProps } from "react";
import { formatDistanceToNow } from "date-fns";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/app/(site)/data";
import { useProduct } from "@/app/(site)/use-product";
import { Button } from "@/components/ui/button";
import { CarTaxiFront, ShoppingCart } from "lucide-react";

interface ProductListProps {
  items: Product[];
}

export function ProductList({ items }: ProductListProps) {
  const [product, setProduct] = useProduct();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              product.selected === item.id && "bg-muted"
            )}
            onClick={() =>
              setProduct({
                ...product,
                selected: item.id,
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    product.selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.price}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-lg">
                  <ShoppingCart />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
