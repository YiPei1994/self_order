import { useCart } from "@/store/CartStore";
import React from "react";
import CartItem from "./CartItem";

function CartList() {
  const { cartList } = useCart();
  return (
    <div>
      {cartList.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
    </div>
  );
}

export default CartList;
