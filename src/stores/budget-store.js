import { create } from "zustand";

export const useBudget = create((set) => ({
    allBudgets: [],
    setAllBudgets: (budgetsArr) =>
        set((state) => ({
            allBudgets: budgetsArr,
        }))
}))