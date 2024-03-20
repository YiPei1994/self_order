"use client";

import { getMenus } from "@/utils/services/ApiMenus";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import Menu from "./Menu";

function MenusList() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "all";

  const { data: menus, isLoading } = useQuery({
    queryKey: ["MenusList", filter],
    queryFn: () => getMenus(filter),
  });

  if (!menus) return;
  if (isLoading) return;

  return (
    <div className="flex flex-wrap">
      {menus.map((menu) => (
        <Menu key={menu.menu_id} menu={menu} />
      ))}
    </div>
  );
}

export default MenusList;
