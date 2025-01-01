import create from "zustand";

// Define the shape of your state
interface Store {
  darkMode: boolean;
  toggleMode: () => void; // Added email setter
}

// Create the Zustand store
const useDarkMode = create<Store>((set) => ({
  darkMode: true,
  toggleMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export default useDarkMode;
