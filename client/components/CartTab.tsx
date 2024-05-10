import React from "react";
import { ResizablePanel } from "./ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";

const CartTab = ({ defaultSize }: any) => {
  return (
    <ResizablePanel defaultSize={defaultSize}>
      <Tabs className="self-end" defaultValue="checkout">
        <div className="flex flex-col py-2 px-3 gap-2">
          {" "}
          <TabsList className="ml-auto">
            <TabsTrigger
              value="checkout"
              className="text-zinc-600 dark:text-zinc-200"
            >
              Checkout
            </TabsTrigger>
            <TabsTrigger
              value="cart"
              className="text-zinc-600 dark:text-zinc-200"
            >
              Cart
            </TabsTrigger>
          </TabsList>
          <Separator />
          <TabsContent value="checkout" className="m-0">
            hello
          </TabsContent>{" "}
        </div>
      </Tabs>
    </ResizablePanel>
  );
};

export default CartTab;
