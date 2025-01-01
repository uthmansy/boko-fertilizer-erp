import create from "zustand";
import { supabase } from "../lib/supabase";
import { UserProfile } from "../types/db";
import { UserSignUp } from "../types/forms";

interface AuthStore {
  user: any | null;
  userProfile: UserProfile | null; // User profile state
  isLoadingProfile: boolean; // Loading state for user profile
  signIn: (payload: { email: string; password: string }) => Promise<void>;
  signUp: (payload: UserSignUp) => Promise<void>;
  signOut: () => Promise<void>;
  checkLoginStatus: () => Promise<void>;
  getUserProfile: () => Promise<void>; // Function to get user profile
  isSessionLoading: boolean; // Loading state for session
}

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  userProfile: null, // Initialize userProfile state
  isLoadingProfile: false, // Initialize isLoadingProfile state
  isSessionLoading: true,
  signIn: async (payload) => {
    let {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword(payload);

    if (error) throw error.message;

    set({ user });
    await get().getUserProfile(); // Fetch user profile after successful sign in
  },
  signUp: async (payload) => {
    // Check if the username already exists
    const { data: existingUsernames, error: usernameError } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", payload.userData.username);

    if (usernameError) {
      console.error("Error checking username:", usernameError.message);
      throw new Error("Error checking username availability");
    }

    if (existingUsernames.length > 0) {
      throw new Error("This Username Has Been Taken");
    }

    // Proceed with sign-up
    const { error: signUpError } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: payload.userData,
      },
    });

    if (signUpError) {
      console.error("Sign-up error:", signUpError.message);
      throw new Error("Sign-up failed: " + signUpError.message);
    }
  },
  signOut: async () => {
    let { error } = await supabase.auth.signOut();
    if (error) throw error.message;
    set({ user: null });
    set({ userProfile: null }); // Clear userProfile state on sign out
  },
  checkLoginStatus: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      set({ user: session.user });
      await get().getUserProfile(); // If user is logged in, fetch user profile
    } else {
      set({ user: null });
    }
    set({ isSessionLoading: false });
  },
  getUserProfile: async () => {
    set({ isLoadingProfile: true }); // Set loading state to true before fetching profile
    const { data: userProfile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", get().user?.id)
      .single();

    if (error) throw error.message;

    set({ userProfile, isLoadingProfile: false }); // Update userProfile and loading state
  },
}));

export default useAuthStore;
