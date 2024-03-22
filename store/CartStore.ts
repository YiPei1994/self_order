import { CartItem, Menu } from "@/utils/types";
import { create } from "zustand";

type CartList = {
  cartList: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, amount: 1 | -1) => void;
};

export const useCart = create<CartList>((set) => ({
  cartList: [],
  addToCart: (item) =>
    set((state) => ({ cartList: [...state.cartList, item] })),
  updateQuantity: (id, amount) =>
    set((state) => ({
      cartList: state.cartList
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0),
    })),
}));
