import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTotalExpense = create(
    persist(
        (set) => ({
            totalExpense: 0,
            allExpenses: [],
            addExpense: (amount, name) =>
                set((state) => ({
                    totalExpense: state.totalExpense + parseFloat(amount),
                    allExpenses: [
                        ...state.allExpenses,
                        {
                            id: Date.now(),
                            name: name,
                            amount: parseFloat(amount),
                            createdAt: new Date(),
                        },
                    ],
                })),
        }),
        {
            name: "expenseStorage",
            partialize: (state) => ({
                totalExpense: state.totalExpense,
                allExpenses: state.allExpenses,
            }),
        }
    )
);
