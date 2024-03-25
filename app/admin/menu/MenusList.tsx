"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import Menu from "./Menu";
import { useAllMenus } from "@/app/api/apiMenu";
import Spinner from "@/components/ui/Spinner";
import { MdControlPoint } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { Button } from "@/components/ui/button";

function MenusList() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "all";

  const { data: menus, isLoading, error } = useAllMenus();

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message} </p>;

  let filteredMenus;

  if (filter === "all") filteredMenus = menus;
  if (filter === "starter")
    filteredMenus = menus?.filter((menu) => menu.type === "starter");
  if (filter === "main")
    filteredMenus = menus?.filter((menu) => menu.type === "main");
  if (filter === "dessert")
    filteredMenus = menus?.filter((menu) => menu.type === "dessert");

  return (
    <div className="flex flex-wrap w-full p-2 min-w-[390px] justify-between">
      {filteredMenus?.map((menu) => (
        <Menu key={menu.menu_id} menu={menu} />
      ))}
    </div>
  );
}

export default MenusList;
