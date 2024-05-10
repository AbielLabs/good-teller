        import {
        AlertCircle,
        ArchiveX,
        File,
        Inbox,
        Search,
        Send,
        Users2,
        LogOut,
        } from "lucide-react";

        import { Nav } from "@/app/(site)/components/nav";
        import React from "react";
        import { Separator } from "./ui/separator";
        import { ThemeSwitcher } from "@/app/(site)/components/theme-switcher";
        import { ResizablePanel } from "./ui/resizable";
        import { cn } from "@/lib/utils";

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
        return (
            <ResizablePanel
            defaultSize={defaultSize}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={15}
            maxSize={20}
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
                    variant: "default",
                },
                {
                    title: "Products",
                    icon: File,
                    variant: "ghost",
                },
                {
                    title: "Debtors",
                    icon: Send,
                    variant: "ghost",
                },
                {
                    title: "Paid User",
                    icon: ArchiveX,
                    variant: "ghost",
                },
                ]}
            />
            <Separator />
            <Nav
                isCollapsed={isCollapsed}
                links={[
                {
                    title: "Records",
                    icon: Users2,
                    variant: "ghost",
                },
                {
                    title: "Customer Service",
                    icon: AlertCircle,
                    variant: "ghost",
                },
                ]}
            />
            <div className="mt-[2rem]">
                <Separator />
                <Nav
                isCollapsed={isCollapsed}
                links={[
                    {
                    title: "Logout",
                    icon: LogOut,
                    variant: "ghost",
                    },
                    {
                    title: "Customer Service",

                    icon: Users2,
                    variant: "ghost",
                    },
                ]}
                />
            </div>
            </ResizablePanel>
        );
        };

        export default Sidebar;
