import { useState, useEffect } from "react";
import axios from "axios";

import { Plus, Coins } from "lucide-react";

import { Header } from "../components/Header";
import { SmallCard } from "../components/SmallCard";
import { MediumCard } from "../components/MediumCard";
import { LargeCard } from "../components/LargeCard";
import { AddExpenseDialog } from "../components/AddExpenseDialog";
import { AddSavingsDialog } from "../components/AddSavingsDialog";
import { AddIncomeDialog } from "../components/AddIncomeDialog";

import { useExpenses } from "../stores/expenses-store";
import { useTotalSavings } from "../stores/savings-store";
import { useUserStore } from "../stores/user-store";
import { RecentTransactions } from "../components/RecentTransactions";

export const Dashboard = ({
    showSidebar,
    setShowSidebar,
    userFirstName,
    userLastName,
    userEmail,
    userImg,
}) => {
    const user = useUserStore((state) => state.user);
    const [addExpenseBtn, setAddExpenseBtn] = useState(false);
    const totalExpense = useExpenses((state) => state.totalExpense);
    const setAllExpenses = useExpenses((state) => state.setAllExpenses);
    const setTotalExpense = useExpenses((state) => state.setTotalExpense);
    const [addSavingsBtn, setAddSavingsBtn] = useState(false);
    const totalSavings = useTotalSavings((state) => state.totalSavings);
    const [updateIncomeBtn, setUpdateIncomeBtn] = useState(false);
    const totalBalance = user.income - (totalExpense + totalSavings);

    const fetchExpenses = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/expenses");
            setAllExpenses(data);
            setTotalExpense(data);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <>
            <div className="flex-1">
                <Header
                    userFirstName={user?.first_name}
                    userLastName={user?.last_name}
                    userEmail={user?.email}
                    userImg={user?.img}
                />

                <div className="flex justify-end pr-7 gap-3">
                    <button
                        onClick={() => setAddExpenseBtn(true)}
                        className="flex gap-1 bg-violet-500 p-4 rounded-full text-white"
                    >
                        <Plus />
                        Add expense
                    </button>

                    <button
                        onClick={() => setAddSavingsBtn(true)}
                        className="flex gap-1 bg-violet-500 p-4 rounded-full text-white"
                    >
                        <Plus />
                        Add savings
                    </button>

                    <button
                        onClick={() => setUpdateIncomeBtn(true)}
                        className="flex gap-1 bg-violet-500 p-4 rounded-full text-white"
                    >
                        <Coins />
                        Update income
                    </button>
                </div>

                <AddExpenseDialog
                    addExpenseBtn={addExpenseBtn}
                    setAddExpenseBtn={setAddExpenseBtn}
                    dialogTitle="Add Expense"
                    dialog="Enter expense"
                />

                <AddSavingsDialog
                    addSavingsBtn={addSavingsBtn}
                    setAddSavingsBtn={setAddSavingsBtn}
                    dialogTitle="Add Savings"
                    dialog="Enter savings"
                />

                <AddIncomeDialog
                    updateIncomeBtn={updateIncomeBtn}
                    setUpdateIncomeBtn={setUpdateIncomeBtn}
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
                        amount={Number(user.income).toLocaleString()}
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
