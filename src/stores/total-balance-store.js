import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTotalBalance = create(
    persist(
        (set) => ({
            totalBalance: 0,
            setTotalBalance: (amount) =>
                set((state) => ({
                    totalBalance: state.totalBalance + parseFloat(amount),
                })),
        }),
        {
            name: "totalBalance",
            partialize: (state) => ({
                totalBalance: state.totalBalance,
            }),
        }
    )
);
