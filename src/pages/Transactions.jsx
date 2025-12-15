import { useExpenses } from "../stores/expenses-store";
import { useSavings } from "../stores/savings-store";
import { formatDate } from "../services/format-date";
import { useEffect } from "react";
import { fetchSavings } from "../services/savings-api";
import { useUserStore } from "../stores/user-store";
import { fetchExpenses } from "../services/expenses-api";

export const Transactions = () => {
    const user = useUserStore((state) => state.user);
    const allExpenses = useExpenses((state) => state.allExpenses);
    const setAllExpenses = useExpenses((state) => state.setAllExpenses);
    const savings = useSavings((state) => state.savings);
    const setSavings = useSavings((state) => state.setSavings);
    // const transactions = [...allExpenses, ...savings];

    const loadExpenses = async () => {
        const expenses = await fetchExpenses(user.id);
        setAllExpenses(expenses);
    };

    const loadSavings = async () => {
        const savings = await fetchSavings(user.id);
        setSavings(savings);
    };

    useEffect(() => {
        loadExpenses();
        loadSavings();
    }, []);

    return (
        <div className="min-h-screen p-2">
            <h1 className="text-4xl">Transactions</h1>

            {allExpenses.map((expense) => (
                <div
                    key={expense.id}
                    className="grid grid-cols-3 border-b-1 p-4"
                >
                    <div className="text-red-400">
                        -{expense.expense_amount}
                    </div>
                    <div>{expense.expense_name}</div>
                    <div>{formatDate(expense.created_at)}</div>
                </div>
            ))}

            {savings.map((saving) => (
                <div
                    key={saving.id}
                    className="grid grid-cols-3 border-b-1 p-4"
                >
                    <div className="text-green-400">
                        -{saving.savings_amount}
                    </div>
                    <div>{saving.name}</div>
                    <div>{formatDate(saving.created_at)}</div>
                </div>
            ))}
        </div>
    );
};
