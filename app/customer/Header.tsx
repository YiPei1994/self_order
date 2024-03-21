"use client";

import { Button } from "@/components/ui/button";
import { useTable } from "@/store/TableStore";
import { MdArrowBack } from "react-icons/md";

import { useRouter } from "next/navigation";
import React from "react";
import Cart from "./Cart";

function Header() {
  const { tableNumber } = useTable();
  const router = useRouter();

  return (
    <header className="flex items-center justify-around w-full p-4 bg-primary/10">
      <Button onClick={() => router.back()}>
        <MdArrowBack />
      </Button>
      <p>Vas stul je:{tableNumber}</p>
      <Cart />
    </header>
  );
}

export default Header;
