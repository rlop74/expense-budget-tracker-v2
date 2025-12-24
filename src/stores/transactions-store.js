import { create } from "zustand";

export const useTransactions = create((set) => ({
    allTransactions: [],
    loading: true,
    setAllTransactions: (transactions) =>
        set((state) => ({ allTransactions: [...state.allTransactions, ...transactions] })),
    setLoading: (bool) => set(() => ({ loading: bool })),
}));
