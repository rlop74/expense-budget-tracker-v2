import { useState } from "react";
import { Plus } from "lucide-react";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { SmallCard } from "./components/SmallCard";
import { MediumCard } from "./components/MediumCard";
import { LargeCard } from "./components/LargeCard";
import { CustomDialog } from "./components/CustomDialog"

function App() {
    const [userFirstName, setUserFirstName] = useState("Russel");
    const [userLastName, setUserLastName] = useState("Lopez");
    const [userEmail, setuserEmail] = useState("email@domain.com");
    const [userImg, setuserImg] = useState(
        "https://media.licdn.com/dms/image/v2/D4E03AQGy1OWBIfOy2A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1691031045223?e=1764201600&v=beta&t=O2Nwj1howzF6UzghUIPliAHVF8_z0qfA3KVrEAACU4s"
    );
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [totalBalance, setTotalBalance] = useState(0);
    const [income, setIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);
    const [showSidebar, setShowSidebar] = useState(true);
    const [open, setOpen] = useState(false);
    const [activePage, setActivePage] = useState("Dashboard");

    return (
        <div className="flex h-screen">
            <Sidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
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

                <CustomDialog open={open} setOpen={setOpen} dialogTitle="Add Expense" dialog="Enter expense"/>

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
        </div>
    );
}

export default App;
