import { create } from "zustand";

type Table = {
  tableNumber: "A1" | "A2" | "A3" | "";
  setTableNumber: (number: "A1" | "A2" | "A3") => void;
};

export const useTable = create<Table>((set) => ({
  tableNumber: "", // Initialize with an empty string
  setTableNumber: (value) => set({ tableNumber: value }),
}));
