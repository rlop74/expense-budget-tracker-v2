import { create } from "zustand";

export const useAppStore = create((set) => ({
    allTransactions: [],
    loading: true,
    setAllTransactions: (transactionsArr) =>
        set((state) => ({
            allTransactions: transactionsArr,
        })),
    setLoading: (bool) => set({ loading: bool }),
}));
