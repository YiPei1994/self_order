import { create } from "zustand";

type DisplayMenuDrawer = {
  displayDrawer: boolean;
  hideDrawer: (state: boolean) => void;
};

export const useMenuDrawer = create<DisplayMenuDrawer>((set) => ({
  displayDrawer: false,
  hideDrawer: (state) => set({ displayDrawer: state }),
}));

type CustomerId = {
  customer_id: string | "";
  setCustomer_id: (id: string) => void;
};

export const useCustomerId = create<CustomerId>((set) => ({
  customer_id: "",
  setCustomer_id: (id) => set({ customer_id: id }),
}));
