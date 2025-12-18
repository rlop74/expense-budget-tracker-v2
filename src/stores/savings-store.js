import { create } from "zustand";
// import { persist } from "zustand/middleware";

export const useSavings = create(
    // persist(
    (set) => ({
        totalSavings: 0,
        savings: [],
        setSavings: (savingsObj) => set(() => ({ savings: savingsObj })),
        setTotalSavings: (savings) =>
            set(() => ({
                totalSavings: savings.reduce(
                    (acc, curr) => acc + curr.amount || 0,
                    0
                ),
            })),
        addTotalSavings: (newSavings) =>
            set((state) => ({
                totalSavings:
                    Number(state.totalSavings) +
                    Number(newSavings.amount),
                savings: [...state.savings, newSavings],
            })),
    })
    //     {
    //         name: "totalSavings",
    //         partialize: (state) => ({
    //             totalSavings: state.totalSavings,
    //         }),
    //     }
    // )
);
