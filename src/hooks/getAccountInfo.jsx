import { useState, useEffect } from "react";
import { useExpenses } from "../stores/expenses-store";
import { useSavings } from "../stores/savings-store";
import { fetchExpenses } from "../services/expenses-api";
import { fetchSavings } from "../services/savings-api";
import { useAppStore } from "../stores/app-store";
import { useUserStore } from "../stores/user-store";
import { useBills } from "../stores/bills-store";
import { fetchBills } from "../services/bills-api";
import { useGoals } from "../stores/goals-store";
import { fetchGoals } from "../services/goals-api";
import { useBudget } from "../stores/budget-store";
import { fetchBudget } from "../services/budget-api";

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
    const setAllGoals = useGoals((state) => state.setAllGoals);
    const setAllBudgets = useBudget((state) => state.setAllBudgets);

    const loadTransactions = async () => {
        const savingsData = await fetchSavings(user.id);
        const expenseData = await fetchExpenses(user.id);
        const billsData = await fetchBills();
        const goalsData = await fetchGoals();
        const budgetData = await fetchBudget();
        setAllExpenses(expenseData);
        setTotalExpense(expenseData);
        setTotalSavings(savingsData);
        setSavings(savingsData);
        setAllTransactions([...expenseData, ...savingsData]);
        setLoading(false);
        setAllBills(billsData);
        setTotalBills(billsData);
        setAllGoals(goalsData);
        setAllBudgets(budgetData);
    };

    useEffect(() => {
        if (user) {
            loadTransactions();
        }
    }, [user]);

    return { allTransactions, loading, user };
};
