import { TableNames } from "@/utils/types";
import { create } from "zustand";

type Table = {
  tableNumber: TableNames;
  setTableNumber: (number: TableNames) => void;
};

export const useTable = create<Table>((set) => ({
  tableNumber: "", // Initialize with an empty string
  setTableNumber: (value) => set({ tableNumber: value }),
}));
