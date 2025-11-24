import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useIncome = create(
    persist(
        (set) => ({
            income: 0,
            updateIncome: (amount) =>
                set((state) => ({
                    income: amount,
                })),
        }),
        { name: "income", partialize: (state) => ({ income: state.income }) }
    )
);
