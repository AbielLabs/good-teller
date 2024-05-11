"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProductList } from "@/app/(site)/components/product-list";
import { type Product } from "@/app/(site)/data";
import { useProduct } from "@/app/(site)/use-product";
import Sidebar from "@/components/Sidebar";
import CartTab from "@/components/CartTab";

interface ProductProps {
  products: Product[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Products({
  products,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: ProductProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [product] = useProduct();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          defaultSize={defaultLayout[0]}
          navCollapsedSize={navCollapsedSize}
        />

        <ResizableHandle withHandle />
        {/* second part */}
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="px-3 py-4 flex flex-col gap-3">
            <h1 className="font-sans font-bold ">Good Teller</h1>
            <Separator />
          </div>
          <div className="px-3 mt-3 mb-[2rem]">
            <Input placeholder="Search Products..." />
          </div>
          <ProductList items={products} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <CartTab defaultSize={defaultLayout[2]} />
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
