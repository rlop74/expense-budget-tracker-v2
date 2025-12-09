import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            setUser: (userObj) => set(() => ({ user: userObj })),
        }),
        {
            name: "user-storage",
            partialize: (state) => ({
                user: state.user,
            }),
        }
    )
);
