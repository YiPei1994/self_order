import { CartItem, Menu } from "@/utils/types";
import { create } from "zustand";

type CartList = {
  cartList: CartItem[];
  addToCart: (item: CartItem) => void;
};

export const useCart = create<CartList>((set) => ({
  cartList: [],
  addToCart: (item) =>
    set((state) => ({ cartList: [...state.cartList, item] })),
}));
