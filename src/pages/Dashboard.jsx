import { useState } from "react";

import { Plus, Coins } from "lucide-react";

import { Header } from "../components/Header";
import { SmallCard } from "../components/SmallCard";
import { MediumCard } from "../components/MediumCard";
import { LargeCard } from "../components/LargeCard";
import { AddExpenseDialog } from "../components/AddExpenseDialog";
import { AddSavingsDialog } from "../components/AddSavingsDialog";
import { AddIncomeDialog } from "../components/AddIncomeDialog";
import { RecentTransactions } from "../components/RecentTransactions";
import { MoneyFlowChart } from "../components/MoneyFlowChart";

import { useExpenses } from "../stores/expenses-store";
import { useSavings } from "../stores/savings-store";
import { useUserStore } from "../stores/user-store";
import { SpendingPieChart } from "../components/SpendingPieChart";
import { SavingGoals } from "../components/SavingGoals";

export const Dashboard = () => {
    const user = useUserStore((state) => state.user);
    const [isUpdateIncomeBtnOpen, setIsUpdateIncomeBtnOpen] = useState(false);
    const [isAddExpenseBtnOpen, setIsAddExpenseBtnOpen] = useState(false);
    const totalExpense = useExpenses((state) => state.totalExpense);
    const [isAddSavingsBtnOpen, setIsAddSavingsBtnOpen] = useState(false);
    const totalSavings = useSavings((state) => state.totalSavings);
    const totalBalance = user.income - (totalExpense + totalSavings);
    // const [loading, setLoading] = useState(false); // for RecentTransactions

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
                    {/* row 1 */}
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

                    {/* row 2 */}
                    <LargeCard
                        title="Money Flow"
                        content={<MoneyFlowChart />}
                    />

                    <MediumCard
                        title="Spending Breakdown"
                        content={<SpendingPieChart />}
                    />

                    {/* row 3 */}
                    <LargeCard
                        title="Recent transactions"
                        content={<RecentTransactions />}
                        // loading={loading}
                    />

                    <MediumCard
                        title="Saving goals"
                        content={<SavingGoals />}
                    />
                </div>
            </div>
        </>
    );
};
