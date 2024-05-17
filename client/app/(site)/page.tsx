"use client";
import { products } from "@/app/(site)/data";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { ProductList } from "./components/product-list";
import CartTab from "@/components/CartTab";

export default function HomePage() {
  return (
    <>
          <ResizableHandle withHandle />
          {/* second part */}
          <ResizablePanel order={2} id="2" defaultSize={400} minSize={30}>
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
          <CartTab defaultSize={300} />
    </>
  );
}
