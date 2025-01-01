import create from "zustand";
import { UserRole } from "../types/db";

// Define the shape of your state
interface Store {
  currentMenu: UserRole | null;
  setMenu: (role: UserRole | null) => void;
}

// Create the Zustand store
const useAdminMenu = create<Store>((set) => ({
  currentMenu: null,
  setMenu: (role) => set(() => ({ currentMenu: role })),
}));

export default useAdminMenu;
