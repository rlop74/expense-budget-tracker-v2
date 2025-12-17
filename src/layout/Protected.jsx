// ask user to login, if no active session
// should not allow user to view protected components without matching creds
// redirect to signup or back to login page

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Login } from "../pages/Login";
import { useUserStore } from "../stores/user-store";
import { useExpenses } from "../stores/expenses-store";
import { useSavings } from "../stores/savings-store";
import { fetchExpenses } from "../services/expenses-api";
import { fetchSavings } from "../services/savings-api";
import { useAppStore } from "../stores/app-store";

export const Protected = () => {
    const user = useUserStore((state) => state.user);
    const setAllExpenses = useExpenses((state) => state.setAllExpenses);
    const setTotalExpense = useExpenses((state) => state.setTotalExpense);
    const setTotalSavings = useSavings((state) => state.setTotalSavings);
    const setSavings = useSavings((state) => state.setSavings);
    const allTransactions = useAppStore((state) => state.allTransactions);
    const setAllTransactions = useAppStore((state) => state.setAllTransactions);
    const setLoading = useAppStore((state) => state.setLoading);
    const loading = useAppStore((state) => state.loading);

    const loadTransactions = async () => {
        const savingsData = await fetchSavings(user.id);
        const expenseData = await fetchExpenses(user.id);
        setAllExpenses(expenseData);
        setTotalExpense(expenseData);
        setTotalSavings(savingsData);
        setSavings(savingsData);
        setAllTransactions([...expenseData, ...savingsData]);
        setLoading(false);
    };

    useEffect(() => {
        loadTransactions();
    }, []);

    if (user) {
        return <Outlet context={{ allTransactions }} />;
    }

    return <Login />;
};
