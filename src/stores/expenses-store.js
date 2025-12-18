import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useExpenses = create(
    // persist(
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
                    (acc, curr) => acc + Number(curr?.amount || 0),
                    0
                ),
            })),
        addNewExpense: (expense) =>
            set((state) => ({
                allExpenses: [...state.allExpenses, expense],
                totalExpense: Number(state.totalExpense) + Number(expense.amount),
            })),
    })
    // {
    //     name: "expenseStorage",
    //     partialize: (state) => ({
    //         totalExpense: state.totalExpense,
    //         allExpenses: state.allExpenses,
    //     }),
    // }
    // )
);
