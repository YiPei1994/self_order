"use client";

import { Button } from "@/components/ui/button";
import { useTable } from "@/store/TableStore";
import { MdArrowBack } from "react-icons/md";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const { tableNumber } = useTable();
  const router = useRouter();

  return (
    <header className="flex items-center justify-around w-full p-4">
      <Button onClick={() => router.back()}>
        <MdArrowBack />
      </Button>
      <p>Vas stul je:{tableNumber}</p>
      <Button onClick={() => router.push("/customer/cart")}>
        <MdOutlineShoppingCartCheckout />
      </Button>
    </header>
  );
}

export default Header;
