import create from "zustand";

// Define the shape of your state
interface Store {
  type: "internal" | "external"; // Only internal and external types
  currentPage: number; // Track the current page
  isModalOpen: boolean; // Track if the modal is open or closed
  nextPage: () => void; // Function to go to the next page
  prevPage: () => void; // Function to go to the previous page
  setType: (value: "internal" | "external") => void; // Function to update type
  resetType: () => void; // Function to reset type to default
  resetPagination: () => void; // Function to reset pagination
  handleOpenModal: () => void; // Function to open the modal
  handleCloseModal: () => void; // Function to close the modal
  resetState: () => void; // Function to reset everything back to initial state
}

// Create the Zustand store
const useSalesStore = create<Store>((set) => ({
  type: "internal", // Default type
  currentPage: 2, // Default page
  isModalOpen: false, // Default modal state
  setType: (value) => set({ type: value }),
  resetType: () => set({ type: "internal" }), // Reset to default value
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  prevPage: () =>
    set((state) => ({ currentPage: Math.max(state.currentPage - 1, 1) })), // Ensure page number doesn't go below 1
  resetPagination: () => set({ currentPage: 2 }), // bypass selecting type for abjar sacks
  handleOpenModal: () => set({ isModalOpen: true }), // Open the modal
  handleCloseModal: () => set({ isModalOpen: false }), // Close the modal
  resetState: () =>
    set({
      type: "internal", // Reset to default type
      currentPage: 2, // Reset to default page
      isModalOpen: false, // Reset to default modal state
    }), // Reset everything to initial state
}));

export default useSalesStore;
