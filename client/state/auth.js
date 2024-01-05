import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: {},
  loading: false,
  login: (authUser) => set((state) => ({ user: authUser })),
  logOut: () => set((state) => ({ user: null })),
  setLoading: (loading) => set((state) => ({ loading })),

}))

export default useAuthStore;
