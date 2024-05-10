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
import { MailList } from "@/app/(site)/components/mail-list";
import { type Mail } from "@/app/(site)/data";
import { useMail } from "@/app/(site)/use-mail";
import Sidebar from "@/components/Sidebar";
import CartTab from "@/components/CartTab";

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Products({
  accounts,
  mails,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();

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
          <MailList items={mails} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <CartTab defaultSize={defaultLayout[2]} />
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
