"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import Cart from "./Cart";
import { useTable } from "@/store/TableStore";

function CustomerOperation() {
  const { tableNumber } = useTable();
  const router = useRouter();
  return (
    <div className="flex items-center justify-between p-4 bg-primary/10 z-30">
      <Button onClick={() => router.back()}>
        <MdArrowBack />
      </Button>
      {tableNumber !== "" && (
        <p>
          Vas stul je:{" "}
          <span className="text-2xl text-primary mx-2">{tableNumber}</span>{" "}
        </p>
      )}
      <Cart />
    </div>
  );
}

export default CustomerOperation;
