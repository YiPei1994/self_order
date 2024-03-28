import { CartItem } from "@/utils/types";
import { create } from "zustand";

type CartList = {
  cartList: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, amount: 1 | -1) => void;
  emptyCart: () => void;
};

export const useCart = create<CartList>((set) => ({
  cartList: [],
  addToCart: (item) =>
    set((state) => {
      const itemIndex = state.cartList.findIndex(
        (cartItem) => cartItem.menu_id === item.menu_id
      );

      if (itemIndex >= 0) {
        // Item exists, so update its quantity
        return {
          cartList: state.cartList.map((cartItem, index) =>
            index === itemIndex
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      } else {
        // Item doesn't exist, so add it to the cart
        const newItem = { ...item, quantity: item.quantity || 1 };
        return { cartList: [...state.cartList, newItem] };
      }
    }),
  updateQuantity: (id, amount) =>
    set((state) => ({
      cartList: state.cartList
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0),
    })),
  emptyCart: () => set({ cartList: [] }),
}));
