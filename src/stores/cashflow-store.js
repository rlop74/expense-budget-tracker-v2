import { create } from "zustand";
import { useTotalExpense } from "./expenses-store";
import { useTotalSavings } from "./savings-store";

export const useExpenseSavings = create((...a) => ({
    ...useTotalExpense(...a),
    ...useTotalSavings(...a),
}));
