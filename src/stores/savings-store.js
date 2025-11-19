import { create } from 'zustand'

export const useTotalSavings = create((set) => ({
    totalSavings: 0,
    addSavings: (amount) =>
        set((state) => ({
            totalSavings: state.totalSavings + parseFloat(amount),
        }))
}))