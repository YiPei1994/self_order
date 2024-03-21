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
import CartList from "./CartList";

function Cart() {
  const { cartList } = useCart();
  return (
    <Drawer>
      <Button variant={cartList.length === 0 ? "secondary" : "default"} asChild>
        <DrawerTrigger>
          <MdOutlineShoppingCartCheckout className="text-xl" />
        </DrawerTrigger>
      </Button>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Vybrane menu</DrawerTitle>
        </DrawerHeader>
        <CartList />
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
