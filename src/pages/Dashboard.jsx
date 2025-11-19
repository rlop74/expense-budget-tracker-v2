import { Plus } from "lucide-react";

import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { SmallCard } from "../components/SmallCard";
import { MediumCard } from "../components/MediumCard";
import { LargeCard } from "../components/LargeCard";
import { CustomDialog } from "../components/CustomDialog";

import { useTotalExpense } from "../stores/expenses-store";

export const Dashboard = ({
    showSidebar,
    setShowSidebar,
    userFirstName,
    userLastName,
    userEmail,
    userImg,
    open,
    setOpen,
    totalBalance,
    income,
    totalSavings,
}) => {
    const totalExpense = useTotalExpense((state) => state.totalExpense);

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

                <div className="flex justify-end pr-7">
                    <button
                        onClick={() => setOpen(true)}
                        className="flex gap-1 bg-violet-500 p-4 rounded-full text-white"
                    >
                        <Plus />
                        Add expense
                    </button>
                </div>

                <CustomDialog
                    open={open}
                    setOpen={setOpen}
                    dialogTitle="Add Expense"
                    dialog="Enter expense"
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
