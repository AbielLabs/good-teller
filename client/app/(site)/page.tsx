"use client";
import { products } from "@/app/(site)/data";
import Sidebar from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { returnlayout } from "@/lib/actions/layout";
import { useState } from "react";
import { ProductList } from "./components/product-list";
import CartTab from "@/components/CartTab";

export default function MailPage() {
  const { defaultCollapsed, defaultLayout } = returnlayout();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <>
   
          <ResizableHandle withHandle />
          {/* second part */}
          <ResizablePanel defaultSize={440} minSize={30}>
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
          <CartTab defaultSize={655} />
  
    </>
  );
}
