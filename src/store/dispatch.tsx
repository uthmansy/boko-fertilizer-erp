import create from "zustand";
import { VehiclesAndDestination } from "../types/db";

// Define the shape of your state
interface Store {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  setFromExternalStock: (value: boolean) => void;
  setToCustomer: (value: boolean) => void;
  setNewDispatchVehicle: (value: VehiclesAndDestination) => void;
  resetValues: () => void; // Added resetValues function
  fromExternalStock: boolean;
  newDispatchVehicle: VehiclesAndDestination | null;
  toCustomer: boolean;
}

// Create the Zustand store
const useDispatchStore = create<Store>((set) => ({
  currentPage: 1,
  newDispatchVehicle: null,
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  prevPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
  setFromExternalStock: (value) => set({ fromExternalStock: value }),
  setToCustomer: (value) => set({ toCustomer: value }),
  setNewDispatchVehicle: (value) => set({ newDispatchVehicle: value }),
  resetValues: () =>
    set({
      currentPage: 2,
      newDispatchVehicle: null,
      fromExternalStock: false,
      toCustomer: false,
    }),
  fromExternalStock: false,
  toCustomer: false,
}));

export default useDispatchStore;
