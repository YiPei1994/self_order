import { create } from "zustand";

type DisplayMenuDrawer = {
  displayDrawer: boolean;
  hideDrawer: (state: boolean) => void;
};

export const useMenuDrawer = create<DisplayMenuDrawer>((set) => ({
  displayDrawer: false,
  hideDrawer: (state) => set({ displayDrawer: state }),
}));
