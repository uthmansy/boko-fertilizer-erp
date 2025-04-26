import create from "zustand";
import { DispatchTypes } from "../types/db";

// Define the shape of your state
interface Store {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  setDispatchType: (value: DispatchTypes) => void;
  setOriginType: (value: "internal" | "external") => void;
  setNewDispatchVehicle: (value: string) => void;
  resetValues: () => void; // Added resetValues function
  newDispatchVehicle: string | null;
  dispatchType: DispatchTypes;
  originType: "internal" | "external";
}

// Create the Zustand store
const useDispatchStore = create<Store>((set) => ({
  currentPage: 1,
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  prevPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
  setDispatchType: (value) => set({ dispatchType: value }),
  setOriginType: (value) => set({ originType: value }),
  setNewDispatchVehicle: (value) => set({ newDispatchVehicle: value }),
  resetValues: () =>
    set({
      currentPage: 1,
      newDispatchVehicle: null,
      dispatchType: "sale",
      originType: "internal",
    }),
  newDispatchVehicle: null,
  dispatchType: "sale",
  originType: "internal",
}));

export default useDispatchStore;
