"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import Menu from "./Menu";
import { getAllMenus } from "@/utils/services/ApiMenus";

function MenusList() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "all";

  const { data: menus, isLoading } = useQuery({
    queryKey: ["MenusList"],
    queryFn: getAllMenus,
  });

  let filteredMenus;

  if (filter === "all") filteredMenus = menus;
  if (filter === "starter")
    filteredMenus = menus?.filter((menu) => menu.type === "starter");
  if (filter === "main")
    filteredMenus = menus?.filter((menu) => menu.type === "main");
  if (filter === "dessert")
    filteredMenus = menus?.filter((menu) => menu.type === "dessert");

  if (!filteredMenus) return;
  if (isLoading) return;

  return (
    <div className="flex flex-wrap w-full p-2 min-w-[390px] justify-between">
      {filteredMenus.map((menu) => (
        <Menu key={menu.menu_id} menu={menu} />
      ))}
    </div>
  );
}

export default MenusList;
