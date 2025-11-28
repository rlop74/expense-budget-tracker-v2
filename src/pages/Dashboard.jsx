import { useState } from "react";
import { Plus, Coins } from "lucide-react";

import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { SmallCard } from "../components/SmallCard";
import { MediumCard } from "../components/MediumCard";
import { LargeCard } from "../components/LargeCard";
import { AddExpenseDialog } from "../components/AddExpenseDialog";
import { AddSavingsDialog } from "../components/AddSavingsDialog";
import { AddIncomeDialog } from "../components/AddIncomeDialog";

import { useTotalExpense } from "../stores/expenses-store";
import { useTotalSavings } from "../stores/savings-store";
import { useIncome } from "../stores/income-store";

export const Dashboard = ({
    showSidebar,
    setShowSidebar,
    userFirstName,
    userLastName,
    userEmail,
    userImg,
    totalBalance,
}) => {
    const [addExpenseBtn, setAddExpenseBtn] = useState(false);
    const totalExpense = useTotalExpense((state) => state.totalExpense);
    const [addSavingsBtn, setAddSavingsBtn] = useState(false);
    const totalSavings = useTotalSavings((state) => state.totalSavings);
    const [updateIncomeBtn, setUpdateIncomeBtn] = useState(false);
    const income = useIncome((state) => state.income);

    return (
        <>
            <div className="flex-1">
                <Header
                    userFirstName={userFirstName}
                    userLastName={userLastName}
                    userEmail={userEmail}
                    userImg={userImg}
                    setShowSidebar={setShowSidebar}
                    showSidebar={showSidebar}
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

                <div className="grid grid-cols-4 grid-rows-3 gap-3 mt-5 m-10">
                    <SmallCard title="Total balance" amount={totalBalance} />
                    <SmallCard title="Income" amount={income} />
                    <SmallCard title="Expense" amount={totalExpense} />
                    <SmallCard title="Total Savings" amount={totalSavings} />

                    <LargeCard title="Money Flow" />
                    <MediumCard title="Budget" />
                    <LargeCard title="Recent transactions" />
                    <MediumCard title="Saving goals" />
                </div>
            </div>
        </>
    );
};
