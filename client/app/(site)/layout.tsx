"use client";
import Sidebar from "@/components/Sidebar";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { returnlayout } from "@/lib/actions/layout";

import React, { useState } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { defaultCollapsed } = returnlayout();
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div>
      <div className="hidden flex-col md:flex">
        <TooltipProvider delayDuration={0}>
          <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes: number[]) => {
              document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                sizes
              )}`;
            }}
            className="h-full min-h-[screen] "
          >
            <Sidebar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed} 
              defaultSize={200}
              navCollapsedSize={4}
            />

            {children}
          </ResizablePanelGroup>
        </TooltipProvider>
      </div>

      <div className="md:hidden min-h-screen flex items-center justify-center">
        Application not availiable on mobile device
      </div>
    </div>
  );
}
