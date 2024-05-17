import {
  AlertCircle,
  ArchiveX,
  File,
  Inbox,
  Search,
  Send,
  Users2,
  LogOut,
  LucideApple,
  LucidePlus,
  ReceiptCent,
} from "lucide-react";

import { Nav } from "@/app/(site)/components/nav";
import React from "react";
import { Separator } from "./ui/separator";
import { ThemeSwitcher } from "@/app/(site)/components/theme-switcher";
import { ResizablePanel } from "./ui/resizable";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: any;
  navCollapsedSize: number;
  defaultSize: number;
}

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  navCollapsedSize,
  defaultSize,
}: SidebarProps) => {
  const admin = false;

  const pathname = usePathname();

  const active = (href: string): boolean =>
    href === pathname || pathname.startsWith(`${href}/`);

  return (
    <ResizablePanel
      defaultSize={defaultSize}
      collapsedSize={navCollapsedSize}
      collapsible={true}
      minSize={20}
      id="1"
      order={1}
      onCollapse={() => {
        setIsCollapsed(true);
        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
          true
        )}`;
      }}
      onExpand={() => {
        setIsCollapsed(false);
        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
          false
        )}`;
      }}
      className={cn(
        isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out"
      )}
    >
      <div
        className={cn(
          "flex h-[52px] items-center justify-center",
          isCollapsed ? "h-[52px]" : "px-2"
        )}
      >
        <ThemeSwitcher isCollapsed={isCollapsed} />
      </div>
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Home",
            icon: Inbox,
            variant: active("/") ? "default" : "ghost",
            href: "/",
          },
          {
            title: "Debtors",
            icon: Send,
            variant: active("/debtors") ? "default" : "ghost",
            href: "/debtors",
          },
          {
            title: "Paid User",
            icon: ArchiveX,
            variant: active("/paid") ? "default" : "ghost",
            href: "/paid",
          },

          {
            title: "Records",
            icon: Users2,
            variant: active("/records") ? "default" : "ghost",
            href: "/records",
          },
        ]}
      />
      <Separator />
      {admin && (
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Products ",
              href: "/product",
              icon: LucideApple,
              variant: active("/product") ? "default" : "ghost",
            },
            {
              title: "Add Staff",
              href: "/staff",
              icon: LucidePlus,
              variant: active("/staff") ? "default" : "ghost",
            },
            {
              title: "Pay Subscription",
              href: "/subscription",
              icon: ReceiptCent,
              variant: active("/subscription") ? "default" : "ghost",
            },
          ]}
        />
      )}
      <Separator />

      <div className="mt-[2rem]">
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Logout",
              icon: LogOut,
              variant: active("/logout") ? "default" : "ghost",
              href: "/logout",
            },
            {
              title: "Customer Service",
              icon: Users2,
              variant: active("/customer") ? "default" : "ghost",
              href: "",
            },
          ]}
        />
      </div>
    </ResizablePanel>
  );
};

export default Sidebar;
