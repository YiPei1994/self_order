"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import React from "react";

function MenusType() {
  const router = useRouter();

  return (
    <div className="flex gap-4 my-2 justify-center items-center flex-wrap">
      <Button onClick={() => router.push("?filter=all")}>All</Button>
      <Button onClick={() => router.push("?filter=starter")}>Starter</Button>
      <Button onClick={() => router.push("?filter=main")}>Main</Button>
      <Button onClick={() => router.push("?filter=dessert")}>Dessert</Button>
    </div>
  );
}

export default MenusType;
