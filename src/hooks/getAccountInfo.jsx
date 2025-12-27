import { useState, useEffect } from "react";
import { useExpenses } from "../stores/expenses-store";
import { useSavings } from "../stores/savings-store";
import { fetchExpenses } from "../services/expenses-api";
import { fetchSavings } from "../services/savings-api";
import { useAppStore } from "../stores/app-store";
import { useUserStore } from "../stores/user-store";
import { useBills } from "../stores/bills-store";
import { fetchBills } from "../services/bills-api";

export const useAccountInfo = () => {
    const user = useUserStore((state) => state.user);
    const loading = useAppStore((state) => state.loading);
    const setLoading = useAppStore((state) => state.setLoading);
    const setAllExpenses = useExpenses((state) => state.setAllExpenses);
    const setTotalExpense = useExpenses((state) => state.setTotalExpense);
    const setSavings = useSavings((state) => state.setSavings);
    const setTotalSavings = useSavings((state) => state.setTotalSavings);
    const allTransactions = useAppStore((state) => state.allTransactions);
    const setAllTransactions = useAppStore((state) => state.setAllTransactions);
    const setAllBills = useBills((state) => state.setAllBills);
    const setTotalBills = useBills((state) => state.setTotalBills);

    const loadTransactions = async () => {
        const savingsData = await fetchSavings(user.id);
        const expenseData = await fetchExpenses(user.id);
        const billsData = await fetchBills();
        setAllExpenses(expenseData);
        setTotalExpense(expenseData);
        setTotalSavings(savingsData);
        setSavings(savingsData);
        setAllTransactions([...expenseData, ...savingsData]);
        setLoading(false);
        setAllBills(billsData);
        setTotalBills(billsData);
    };

    useEffect(() => {
        if (user) {
            loadTransactions();
        }
    }, [user]);

    return { allTransactions, loading, user };
};
