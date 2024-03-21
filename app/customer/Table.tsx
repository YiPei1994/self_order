"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../../components/ui/input";
import { useTable } from "@/store/TableStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Table() {
  const { tableNumber, setTableNumber } = useTable();
  const [message, setMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (value === "A1" || value === "A2" || value === "A3") {
      setTableNumber(value);
      setMessage("");
    } else {
      setMessage("Neexistujici cislo stolu.");
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Zadejte cislo vas stul:</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <Input
            type="text"
            placeholder="cislo..."
            defaultValue="A1"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button asChild>
            <Link href="/customer/menu">Normalni Menu</Link>
          </Button>
          <Button asChild>
            <Link href="/customer/order">All you can eat</Link>
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <p>{message}</p>
      </CardFooter>
    </Card>
  );
}

export default Table;
