"use client";

import React from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useCart } from "@/store/CartStore";

import CartItem from "./CartItem";

function Cart() {
  const { cartList } = useCart();
  return (
    <Drawer>
      <Button
        className={`${
          cartList.length === 0 ? "opacity-0" : "opacity-100"
        } transition-all duration-300`}
        asChild
      >
        <DrawerTrigger>
          <MdOutlineShoppingCartCheckout className="text-xl" />
        </DrawerTrigger>
      </Button>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Vybrane menu</DrawerTitle>
        </DrawerHeader>
        {cartList.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Cart;
