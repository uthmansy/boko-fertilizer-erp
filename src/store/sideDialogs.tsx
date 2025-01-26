// stores/dialogStore.ts
import { create } from "zustand";

type DialogState = {
  isVisible: boolean;
  content: React.ReactNode | null;
  title: string;
  fullScreenMobile: boolean;
  showDialog: (
    content: React.ReactNode,
    options?: {
      title?: string;
      fullScreenMobile?: boolean;
    }
  ) => void;
  hideDialog: () => void;
};

const useDialogStore = create<DialogState>((set) => ({
  isVisible: false,
  content: null,
  title: "",
  fullScreenMobile: true,

  showDialog: (content, options = {}) =>
    set({
      isVisible: true,
      content,
      title: options.title || "",
      fullScreenMobile: options.fullScreenMobile ?? true,
    }),

  hideDialog: () =>
    set({
      isVisible: false,
      content: null,
      title: "",
      fullScreenMobile: true,
    }),
}));

export default useDialogStore;
