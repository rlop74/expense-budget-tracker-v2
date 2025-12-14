import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSavings = create(
    persist(
        (set) => ({
            totalSavings: 0,
            savings: [],
            setSavings: (savings) =>
                set(() => ({ savings })),
            setTotalSavings: (savings) =>
                set(() => ({
                    totalSavings: savings.reduce(
                        (acc, curr) => acc + curr.savings_amount || 0,
                        0
                    ),
                })),
        }),
        {
            name: "totalSavings",
            partialize: (state) => ({
                totalSavings: state.totalSavings,
            }),
        }
    )
);
