import create from "zustand";

// Define the shape of your state
interface Store {
  currentWindow: "main" | "pos";
  setWindow: (window: "main" | "pos") => void; // Added email setter
}

// Create the Zustand store
const useWindow = create<Store>((set) => ({
  currentWindow: "main",
  setWindow: (window) => set(() => ({ currentWindow: window })),
}));

export default useWindow;
