import { useState, useEffect } from "react";
import { useExpenses } from "../stores/expenses-store";
import { useSavings } from "../stores/savings-store";
import { formatDate } from "../services/format-date"; // data-fns
import { fetchSavings } from "../services/savings-api";
import { useUserStore } from "../stores/user-store";
import { fetchExpenses } from "../services/expenses-api";

export const Transactions = () => {
    const user = useUserStore((state) => state.user);
    const allExpenses = useExpenses((state) => state.allExpenses);
    const setAllExpenses = useExpenses((state) => state.setAllExpenses);
    const savings = useSavings((state) => state.savings);
    const setSavings = useSavings((state) => state.setSavings);
    const transactions = [...allExpenses, ...savings];
    const [loading, setLoading] = useState(true);

    const loadExpenses = async () => {
        const expenses = await fetchExpenses(user.id);
        setAllExpenses(expenses);
    };

    const loadSavings = async () => {
        const savings = await fetchSavings(user.id);
        setSavings(savings);
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

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">All Transactions</h1>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                {/* table header */}
                <div className="grid grid-cols-4 bg-gray-50 p-4 font-semibold">
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Name</div>
                    <div>Type</div>
                </div>

                {loading ? (
                    <p>Loading transactions...</p>
                ) : transactions.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">
                        No transactions yet
                    </p>
                ) : (
                    transactions
                        .sort(
                            (a, b) =>
                                new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((t) => (
                            <div className="grid grid-cols-4 p-4 border-b hover:bg-gray-100">
                                <div>{formatDate(t.created_at)}</div>
                                <div
                                    className={
                                        t.expense_amount
                                            ? "text-red-600"
                                            : "text-green-600"
                                    }
                                >
                                    {t.expense_amount ? "-" : "+"}
                                    {Number(
                                        t.expense_amount || t.savings_amount
                                    ).toFixed(2)}
                                </div>
                                <div className="capitalize">
                                    {t.expense_name || t.name}
                                </div>
                                <div className="">
                                    {t.expense_amount ? "Expense" : "Savings"}
                                </div>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
};
