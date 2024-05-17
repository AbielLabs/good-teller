"use server";

import { cookies } from "next/headers";

export const returnlayout = () => {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return { layout, collapsed, defaultCollapsed, defaultLayout };
};
