import { create } from "zustand";
import { loginAPI } from "../api/auth.api";

const useAuthStoreLogin = create((set) => ({
  user: null,
  loading: false,

  login: async (formData) => {
    try {
      set({ loading: true });
      const data = await loginAPI(formData);

      set({
        user: data.user,
        loading: false,
      });
      return { success: true, message: data.message };
    } catch (error) {
      set({ loading: false });

      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },
}));

export default useAuthStoreLogin;
