"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

interface ThemeSwitcherProps {
  isCollapsed: boolean;
}

export function ThemeSwitcher({ isCollapsed }: ThemeSwitcherProps) {
  const [selectedTheme, setSelectedTheme] = React.useState<string>("Dark");

  const { setTheme } = useTheme();

  const handleChange = (e: string) => {
    console.log(e);

    setSelectedTheme(e);
    setTheme(e.toLowerCase());
  };

  return (
    <Select defaultValue={selectedTheme} onValueChange={handleChange}>
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select theme">
          {["Dark", "System", "Light"].find((item) => item === selectedTheme)}{" "}
          Mode
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {["Dark", "System", "Light"].map((item, i) => (
          <SelectItem key={i} value={item}>
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              {item}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
