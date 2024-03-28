"use client";

import React, { useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useCart } from "@/store/CartStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import CartItem from "./CartItem";
import { useTable } from "@/store/TableStore";
import { useCreateOrder } from "../api/apiOrder";
import { useRouter } from "next/navigation";
import { getWithExpiry, setWithExpiry } from "@/utils/helpers";

function Cart() {
  const { cartList, emptyCart } = useCart();
  const { createOrder } = useCreateOrder();
  const { tableNumber } = useTable();
  const router = useRouter();
  const [close, setClose] = useState(false);

  function initiateOrder() {
    if (!getWithExpiry("customer_id")) {
      setWithExpiry("customer_id", uuidv4(), 7200000);
    }
  }
  function handleOrder() {
    if (cartList.length === 0 || tableNumber === "") return;
    const customer_id = getWithExpiry("customer_id");
    createOrder(
      { cart: cartList, table_name: tableNumber, customer_id },
      {
        onSuccess: () => {
          emptyCart();
          setClose(false);
          router.replace("/customer/order");
        },
      }
    );
  }

  return (
    <Drawer open={close} onOpenChange={setClose}>
      <DrawerTrigger
        className={`${
          cartList.length === 0 ? "opacity-0" : "opacity-100"
        } duration-300 transition-all text-2xl text-primary`}
      >
        <MdOutlineShoppingCartCheckout />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Vybrane menu</DrawerTitle>
        </DrawerHeader>
        {cartList.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
        <DrawerFooter className="flex items-center justify-evenly flex-row w-full">
          <DrawerClose>Zpatky</DrawerClose>
          <Dialog>
            <DialogTrigger
              onClick={initiateOrder}
              className="text-primary p-1.5 border border-primary rounded-lg "
            >
              Objednat
            </DialogTrigger>
            <DialogContent className="w-4/5 m-auto flex flex-col gap-8">
              <DialogHeader className="my-2">
                <DialogTitle>Dokoncit a poslat objednavku?</DialogTitle>
              </DialogHeader>

              <Button onClick={handleOrder}>Dokoncit</Button>
            </DialogContent>
          </Dialog>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Cart;
