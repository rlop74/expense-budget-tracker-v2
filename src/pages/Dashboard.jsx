import { useState } from "react";
import { Plus, Coins, PiggyBank, Receipt } from "lucide-react";

import { Header } from "../components/Header";
import { SmallCard } from "../components/SmallCard";
import { MediumCard } from "../components/MediumCard";
import { LargeCard } from "../components/LargeCard";
import { RecentTransactions } from "../components/RecentTransactions";
import { MoneyFlowChart } from "../components/MoneyFlowChart";
import { SpendingPieChart } from "../components/SpendingPieChart";
import { SavingGoals } from "../components/SavingGoals";

import { useExpenses } from "../stores/expenses-store";
import { useSavings } from "../stores/savings-store";
import { useUserStore } from "../stores/user-store";
import { Dialog } from "../components/Dialog";
import { useAccountInfo } from "../hooks/getAccountInfo";
import { useAppStore } from "../stores/app-store";
import { addExpense } from "../services/expenses-api";
import { addSavings } from "../services/savings-api";
import { updateIncome } from "../services/income-api";

export const Dashboard = () => {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const { allTransactions } = useAccountInfo();
    const [updatedIncome, setUpdatedIncome] = useState();

    // modal states
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
    const [isAddSavingsOpen, setIsAddSavingsOpen] = useState(false);
    const [isUpdateIncomeOpen, setIsUpdateIncomeOpen] = useState(false);

    // store functions and variables
    const totalExpense = useExpenses((state) => state.totalExpense);
    const addNewExpense = useExpenses((state) => state.addNewExpense);
    const totalSavings = useSavings((state) => state.totalSavings);
    const addTotalSavings = useSavings((state) => state.addTotalSavings);
    const totalBalance = user.income - (totalExpense + totalSavings);
    const setAllTransactions = useAppStore((state) => state.setAllTransactions);

    // empty states for adding and editing
    const [newExpense, setNewExpense] = useState({
        user_id: user.id,
        name: "",
        amount: "",
        category: "",
    });
    const [newSavings, setNewSavings] = useState({
        user_id: user.id,
        amount: "",
    });

    // handle functions
    const handleAddExpense = async () => {
        // Validate inputs
        if (
            !newExpense.name.trim() ||
            !newExpense.amount ||
            !newExpense.category
        ) {
            alert("Please fill in all fields");
            return;
        }

        const data = await addExpense(newExpense);
        if (!data) return;
        addNewExpense(data);
        setAllTransactions([...allTransactions, data]);

        // clear inputs on click
        setNewExpense({
            user_id: user.id,
            name: "",
            amount: "",
            category: "",
        });

        setIsAddExpenseOpen(false);
    };

    const handleAddSavings = async () => {
        try {
            const data = await addSavings(newSavings);

            // update store/UI
            addTotalSavings(data);
            setAllTransactions([...allTransactions, data]);

            // clear state and close modal
            setNewSavings({
                user_id: user.id,
                amount: "",
            });
            setIsAddSavingsOpen(false);
        } catch (err) {
            console.error("Failed to add savings: ", err);
            alert("Something went wrong");
        }
    };

    const handleUpdateIncome = () => {
        if (!updatedIncome) {
            alert("Please enter income");
            return;
        }
        updateIncome(updatedIncome, user.auth_id);
        setUser({ ...user, income: updatedIncome });
        setIsUpdateIncomeOpen(false);
        setUpdatedIncome();
    };

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
            {isAddExpenseOpen && (
                <Dialog
                    title="Add Expense"
                    setIsOpen={setIsAddExpenseOpen}
                    handleFunction={handleAddExpense}
                >
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expense Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                placeholder="e.g. Dinner"
                                value={newExpense.name}
                                onChange={(e) =>
                                    setNewExpense({
                                        ...newExpense,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expense Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                                    $
                                </span>
                                <input
                                    type="number"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                    placeholder="0.00"
                                    value={newExpense.amount}
                                    onChange={(e) =>
                                        setNewExpense({
                                            ...newExpense,
                                            amount: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <select
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                            value={newExpense.category}
                            onChange={(e) =>
                                setNewExpense({
                                    ...newExpense,
                                    category: e.target.value,
                                })
                            }
                        >
                            <option value="" className="text-gray-300">
                                Please select...
                            </option>
                            <option value="Monthly Bills & Utilities">
                                Monthly Bills & Utilities
                            </option>
                            <option value="Education">Education</option>
                            <option value="Entertainment & Shopping">
                                Entertainment & Shopping
                            </option>
                            <option value="Food & Groceries">
                                Food & Groceries
                            </option>
                            <option value="Transport & Automotive">
                                Transport & Automotive
                            </option>
                            <option value="Health & Wellness">
                                Health & Wellness
                            </option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </Dialog>
            )}

            {isAddSavingsOpen && (
                <Dialog
                    title="Add Savings"
                    setIsOpen={setIsAddSavingsOpen}
                    handleFunction={handleAddSavings}
                >
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Savings Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                                    $
                                </span>
                                <input
                                    type="number"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                    placeholder="0.00"
                                    value={newSavings.amount}
                                    onChange={(e) =>
                                        setNewSavings({
                                            ...newSavings,
                                            amount: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Dialog>
            )}

            {isUpdateIncomeOpen && (
                <Dialog
                    title="Update Income"
                    setIsOpen={setIsUpdateIncomeOpen}
                    handleFunction={handleUpdateIncome}
                >
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Income Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                                    $
                                </span>
                                <input
                                    type="number"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                    placeholder="0.00"
                                    value={updatedIncome}
                                    onChange={(e) =>
                                        setUpdatedIncome(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Dialog>
            )}
        </div>
    );
};
