import { create } from 'zustand'

export const useTotalExpense = create((set) => ({
    totalExpense: 0,
    addExpense: (amount) => set((state) => ({ totalExpense: state.totalExpense + parseFloat(amount) }))
}))