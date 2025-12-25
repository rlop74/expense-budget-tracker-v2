import { useState } from "react";
import { Plus, Coins, PiggyBank, Receipt } from "lucide-react";

import { Header } from "../components/Header";
import { SmallCard } from "../components/SmallCard";
import { MediumCard } from "../components/MediumCard";
import { LargeCard } from "../components/LargeCard";
import { AddExpenseDialog } from "../components/AddExpenseDialog";
import { AddSavingsDialog } from "../components/AddSavingsDialog";
import { AddIncomeDialog } from "../components/AddIncomeDialog";
import { RecentTransactions } from "../components/RecentTransactions";
import { MoneyFlowChart } from "../components/MoneyFlowChart";
import { SpendingPieChart } from "../components/SpendingPieChart";
import { SavingGoals } from "../components/SavingGoals";

import { useExpenses } from "../stores/expenses-store";
import { useSavings } from "../stores/savings-store";
import { useUserStore } from "../stores/user-store";

export const Dashboard = () => {
    const user = useUserStore((state) => state.user);
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
    const [isAddSavingsOpen, setIsAddSavingsOpen] = useState(false);
    const [isUpdateIncomeOpen, setIsUpdateIncomeOpen] = useState(false);

    const totalExpense = useExpenses((state) => state.totalExpense);
    const totalSavings = useSavings((state) => state.totalSavings);
    const totalBalance = user.income - (totalExpense + totalSavings);

    return (
        <div className="min-h-screen">
            <Header />

            {/* Main Content Container */}
            <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                {/* Summary Cards - Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <SmallCard
                        title="Remaining Balance"
                        amount={totalBalance.toLocaleString()}
                        className="bg-white shadow-sm rounded-xl"
                    />
                    <SmallCard
                        title="Income"
                        amount={Number(user?.income).toLocaleString()}
                        className="bg-white shadow-sm rounded-xl"
                    />
                    <SmallCard
                        title="Total Expenses"
                        amount={totalExpense.toLocaleString()}
                        className="bg-white shadow-sm rounded-xl"
                    />
                    <SmallCard
                        title="Total Savings"
                        amount={totalSavings.toLocaleString()}
                        className="bg-white shadow-sm rounded-xl"
                    />
                </div>

                {/* Charts & Lists - Responsive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Money Flow - Larger on big screens */}
                    <div className="lg:col-span-2">
                        <LargeCard
                            title="Money Flow"
                            content={<MoneyFlowChart />}
                            className="bg-white shadow-sm rounded-xl h-full"
                        />
                    </div>

                    {/* Spending Breakdown */}
                    <div className="">
                        <MediumCard
                            title="Spending Breakdown"
                            content={<SpendingPieChart />}
                            className="bg-white shadow-sm rounded-xl h-full"
                        />
                    </div>

                    {/* Recent Transactions */}
                    <div className="lg:col-span-2">
                        <LargeCard
                            title="Recent Transactions"
                            content={<RecentTransactions />}
                            className="bg-white shadow-sm rounded-xl h-full"
                        />
                    </div>

                    {/* Saving Goals */}
                    <div className="">
                        <MediumCard
                            title="Saving Goals"
                            content={<SavingGoals />}
                            className="bg-white shadow-sm rounded-xl h-full"
                        />
                    </div>
                </div>
            </main>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-4">
                {/* Add Expense Button */}
                <div className="group relative">
                    <button
                        onClick={() => setIsAddExpenseOpen(true)}
                        className="flex items-center justify-center w-14 h-14 bg-red-500 text-white rounded-full shadow-lg hover:!bg-red-600 transition transform hover:scale-110"
                        aria-label="Add expense"
                    >
                        <Receipt className="w-6 h-6" />
                    </button>
                    <span className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap">
                        Add Expense
                    </span>
                </div>

                {/* Add Savings Button */}
                <div className="group relative">
                    <button
                        onClick={() => setIsAddSavingsOpen(true)}
                        className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:!bg-green-600 transition transform hover:scale-110"
                        aria-label="Add savings"
                    >
                        <PiggyBank className="w-6 h-6" />
                    </button>
                    <span className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap">
                        Add Savings
                    </span>
                </div>
                {/* Update Income Button */}
                <div className="group relative">
                    <button
                        onClick={() => setIsUpdateIncomeOpen(true)}
                        className="flex items-center justify-center w-14 h-14 bg-violet-600 text-white rounded-full shadow-lg hover:!bg-violet-700 transition transform hover:scale-110"
                        aria-label="Update income"
                    >
                        <Coins className="w-6 h-6" />
                    </button>
                    {/* Tooltip */}
                    <span className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:!opacity-100 transition-opacity bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap">
                        Update Income
                    </span>
                </div>
            </div>

            {/* Dialogs */}
            <AddExpenseDialog
                isAddExpenseBtnOpen={isAddExpenseOpen}
                setIsAddExpenseBtnOpen={setIsAddExpenseOpen}
                dialogTitle="Add Expense"
                dialog="Enter expense"
            />
            <AddSavingsDialog
                isAddSavingsBtnOpen={isAddSavingsOpen}
                setIsAddSavingsBtnOpen={setIsAddSavingsOpen}
                dialogTitle="Add Savings"
                dialog="Enter savings"
            />
            <AddIncomeDialog
                isUpdateIncomeBtnOpen={isUpdateIncomeOpen}
                setIsUpdateIncomeBtnOpen={setIsUpdateIncomeOpen}
                dialogTitle="Update Income"
                dialog="Enter income"
            />
        </div>
    );
};
