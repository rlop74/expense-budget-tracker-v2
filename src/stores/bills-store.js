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
    addNewBill: (newBillObj) =>
        set((state) => ({
            allBills: [...state.allBills, newBillObj],
            totalBill: Number(state.totalBill) + Number(newBillObj.amount),
        })),
    updateBill: (updatedBill) => {
        set((state) => ({
            allBills: [
                ...state.allBills.filter((bill) => bill.id !== updatedBill.id),
                updatedBill,
            ],
        }));
    },
}));
