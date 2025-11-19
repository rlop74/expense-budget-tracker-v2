import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
    persist(
        (set) => ({
            theme: "Sun",
            changeTheme: (theme) =>
                set((state) => ({
                    theme: theme,
                })),
        }),
        { name: "theme", partialize: (state) => ({ theme: state.theme }) }
    )
);
