import { create } from "zustand";
import { useExpenses } from "./expenses-store";
import { useTotalSavings } from "./savings-store";

export const useExpenseSavings = create((...a) => ({
    ...useExpenses(...a),
    ...useTotalSavings(...a),
}));
