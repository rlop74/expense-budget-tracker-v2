import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTotalSavings = create(
    persist(
        (set) => ({
            totalSavings: 0,
            addSavings: (amount) =>
                set((state) => ({
                    totalSavings: state.totalSavings + parseFloat(amount),
                })),
        }),
        {
            name: "totalSavings",
            partialize: (state) => ({
                totalSavings: state.totalSavings,
            }),
        }
    )
);
