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

export const Protected = () => {
    const user = useUserStore((state) => state.user);
    const setAllExpenses = useExpenses((state) => state.setAllExpenses);
    const setTotalExpense = useExpenses((state) => state.setTotalExpense);
    const setTotalSavings = useSavings((state) => state.setTotalSavings);
    const setSavings = useSavings((state) => state.setSavings);
    const [loading, setLoading] = useState(true);

    const loadExpenses = async () => {
        const data = await fetchExpenses(user.id);
        setAllExpenses(data);
        setTotalExpense(data);
    };

    const loadSavings = async () => {
        const data = await fetchSavings(user.id);
        setTotalSavings(data);
        setSavings(data);
    };

    useEffect(() => {
        const load = async () => {
            setLoading(true);

            // execute both functions concurrently and wait for both to complete successfully
            await Promise.all([loadExpenses(), loadSavings()]);

            setLoading(false);
        };
        load();
    }, []);

    if (user) {
        return <Outlet loading={loading}/>;
    }

    return <Login />;
};
