import { create } from "zustand";

export const useBills = create((set) => ({
    totalBill: 0,
    allBills: [],
    setTotalBills: (billsArr) =>
        set((state) => ({
            totalBill: billsArr.reduce(
                (acc, curr) => acc + Number(curr.amount),
                0
            ),
        })),
    setAllBills: (billsArr) =>
        set((state) => ({
            allBills: billsArr,
        })),
}));
