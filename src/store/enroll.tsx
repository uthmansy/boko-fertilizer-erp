import create from "zustand";

// Define the shape of your state
interface Store {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  setEmail: (email: string) => void; // Added email setter
  setWarehouse: (warehouse: string) => void; // Added email setter
  setRole: (email: string) => void; // Added email setter
  setEmailVerified: (isVerified: boolean) => void; // Added email verification setter
  resetValues: () => void; // Added resetValues function
  email: string | null; // Added email field
  role: string | null; // Added email field
  warehouse: string | null; // Added email field
  isEmailVerified: boolean; // Added email verification status
}

// Create the Zustand store
const useEnrollStore = create<Store>((set) => ({
  currentPage: 1,
  email: null,
  role: null,
  warehouse: null,
  isEmailVerified: false,
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  prevPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
  setEmail: (email) => set({ email }),
  setWarehouse: (warehouse) => set({ warehouse }),
  setRole: (role) => set({ role }),
  setEmailVerified: (isVerified) => set({ isEmailVerified: isVerified }),
  resetValues: () =>
    set({
      currentPage: 1,
      email: null,
      isEmailVerified: false,
    }),
}));

export default useEnrollStore;
