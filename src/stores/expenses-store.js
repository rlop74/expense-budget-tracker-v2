import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useExpenses = create(
    persist(
        (set) => ({
            totalExpense: 0,
            allExpenses: [],
            setAllExpenses: (expenses) =>
                set((state) => ({
                    allExpenses: expenses,
                })),
            setTotalExpense: (expenses) =>
                set((state) => ({
                    totalExpense: expenses.reduce(
                        (acc, curr) => acc + Number(curr?.expense_amount || 0),
                        0
                    ),
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
