import { useState, useEffect } from "react";

import { Plus, Coins } from "lucide-react";

import { Header } from "../components/Header";
import { SmallCard } from "../components/SmallCard";
import { MediumCard } from "../components/MediumCard";
import { LargeCard } from "../components/LargeCard";
import { AddExpenseDialog } from "../components/AddExpenseDialog";
import { AddSavingsDialog } from "../components/AddSavingsDialog";
import { AddIncomeDialog } from "../components/AddIncomeDialog";
import { RecentTransactions } from "../components/RecentTransactions";

import { useExpenses } from "../stores/expenses-store";
import { useSavings } from "../stores/savings-store";
import { useUserStore } from "../stores/user-store";
import { fetchExpenses } from "../services/expenses-api";
import { fetchSavings } from "../services/savings-api";

export const Dashboard = () => {
    const user = useUserStore((state) => state.user);
    const [isUpdateIncomeBtnOpen, setIsUpdateIncomeBtnOpen] = useState(false);
    const [isAddExpenseBtnOpen, setIsAddExpenseBtnOpen] = useState(false);
    const totalExpense = useExpenses((state) => state.totalExpense);
    const setAllExpenses = useExpenses((state) => state.setAllExpenses);
    const setTotalExpense = useExpenses((state) => state.setTotalExpense);
    const [isAddSavingsBtnOpen, setIsAddSavingsBtnOpen] = useState(false);
    const totalSavings = useSavings((state) => state.totalSavings);
    const setTotalSavings = useSavings((state) => state.setTotalSavings);
    const totalBalance = user.income - (totalExpense + totalSavings);

    const loadExpenses = async () => {
        const data = await fetchExpenses(user.id);
        setAllExpenses(data);
        setTotalExpense(data);
    };

    const loadSavings = async () => {
        const data = await fetchSavings(user.id);
        setTotalSavings(data);
    }

    useEffect(() => {
        loadExpenses();
        loadSavings();
    }, []);

    return (
        <>
            <div className="flex-1">
                <Header />

                <div className="flex justify-end pr-7 gap-3">
                    <button
                        onClick={() => setIsAddExpenseBtnOpen(true)}
                        className="flex gap-1 bg-violet-500 p-4 rounded-full text-white"
                    >
                        <Plus />
                        Add expense
                    </button>

                    <button
                        onClick={() => setIsAddSavingsBtnOpen(true)}
                        className="flex gap-1 bg-violet-500 p-4 rounded-full text-white"
                    >
                        <Plus />
                        Add savings
                    </button>

                    <button
                        onClick={() => setIsUpdateIncomeBtnOpen(true)}
                        className="flex gap-1 bg-violet-500 p-4 rounded-full text-white"
                    >
                        <Coins />
                        Update income
                    </button>
                </div>

                <AddExpenseDialog
                    isAddExpenseBtnOpen={isAddExpenseBtnOpen}
                    setIsAddExpenseBtnOpen={setIsAddExpenseBtnOpen}
                    dialogTitle="Add Expense"
                    dialog="Enter expense"
                />

                <AddSavingsDialog
                    isAddSavingsBtnOpen={isAddSavingsBtnOpen}
                    setIsAddSavingsBtnOpen={setIsAddSavingsBtnOpen}
                    dialogTitle="Add Savings"
                    dialog="Enter savings"
                />

                <AddIncomeDialog
                    isUpdateIncomeBtnOpen={isUpdateIncomeBtnOpen}
                    setIsUpdateIncomeBtnOpen={setIsUpdateIncomeBtnOpen}
                    dialogTitle="Update Income"
                    dialog="Enter Income"
                />

                <div className="grid grid-cols-4 grid-rows-3 grid-rows-[1fr_2fr_2fr] gap-3 mt-5 m-10">
                    <SmallCard
                        title="Remaining balance"
                        amount={totalBalance.toLocaleString()}
                    />
                    <SmallCard
                        title="Income"
                        amount={Number(user?.income).toLocaleString()}
                    />
                    <SmallCard
                        title="Total Expense"
                        amount={totalExpense.toLocaleString()}
                    />
                    <SmallCard
                        title="Total Savings"
                        amount={totalSavings.toLocaleString()}
                    />

                    <LargeCard title="Money Flow" />
                    <MediumCard title="Budget" />
                    <LargeCard
                        title="Recent transactions"
                        content={<RecentTransactions />}
                    />
                    <MediumCard title="Saving goals" />
                </div>
            </div>
        </>
    );
};
