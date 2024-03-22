"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/store/CartStore";
import { CartItem } from "@/utils/types";
import React from "react";
import { MdAdd } from "react-icons/md";
import { MdRemove } from "react-icons/md";

type CartItemProps = {
  cartItem: CartItem;
};

function CartItem({ cartItem }: CartItemProps) {
  const { updateQuantity } = useCart();
  const { id, quantity, menu } = cartItem;
  return (
    <div className="flex gap-4 items-center p-4 bg-primary/10 w-[95%] m-auto">
      <div className="w-[60px] h-auto">
        <img src={menu?.image} alt={menu?.name} />
      </div>
      <p>{menu?.name} </p>
      <div className="flex gap-4 items-center">
        <Button onClick={() => updateQuantity(id, -1)} variant="outline">
          <MdRemove />
        </Button>
        <p>{quantity} </p>
        <Button onClick={() => updateQuantity(id, 1)} variant="outline">
          <MdAdd />
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
