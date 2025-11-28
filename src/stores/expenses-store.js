import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTotalExpense = create(
    persist(
        (set) => ({
            totalExpense: 0,
            addExpense: (amount) =>
                set((state) => ({
                    totalExpense: state.totalExpense + parseFloat(amount),
                })),
        }),
        {
            name: "totalExpense",
            partialize: (state) => ({
                totalExpense: state.totalExpense,
            }),
        }
    )
);
