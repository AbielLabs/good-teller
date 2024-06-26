import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import React from "react";

const DebtorsPage = () => {
  return (
    <>
      <ResizableHandle withHandle />
      {/* second part */}
      <ResizablePanel order={2} id="2" defaultSize={400} >
        <div className="min-h-screen">debtirs</div>
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel order={3} id="3" defaultSize={300} >clear</ResizablePanel>
    </>
  );
};

export default DebtorsPage;
