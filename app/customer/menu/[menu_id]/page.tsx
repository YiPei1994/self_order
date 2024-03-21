"use client";
import { getExactMenu } from "@/utils/services/ApiMenus";
import { useQuery } from "@tanstack/react-query";

import React from "react";

function MenuDetailsPage({ params }: { params: { menu_id: string } }) {
  const id = params.menu_id;

  const { data: menu } = useQuery({
    queryKey: ["menu"],
    queryFn: () => getExactMenu(+id),
  });

  if (!menu) return;

  return <div>MenuDetailsPage {params.menu_id} </div>;
}

export default MenuDetailsPage;
