import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import { useTotalExpense } from "./stores/expenses-store";
import { useUserImg } from "./stores/user-img-store";

import { DefaultLayout } from "./layout/DefaultLayout";
import { Dashboard } from "./pages/Dashboard";
import { Transactions } from "./pages/Transactions";
import { Wallet } from "./pages/Wallet";
import { Goals } from "./pages/Goals";
import { Budget } from "./pages/Budget";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";

function App() {
    const [userFirstName, setUserFirstName] = useState("Russel");
    const [userLastName, setUserLastName] = useState("Lopez");
    const [userEmail, setuserEmail] = useState("email@domain.com");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [totalBalance, setTotalBalance] = useState(0);
    const [income, setIncome] = useState(0);
    const [expenseName, setExpenseName] = useState("");
    const [showSidebar, setShowSidebar] = useState(true);
    const [open, setOpen] = useState(false);
    const { userImg, changeUserImg } = useUserImg((state) => state);
    const [activePage, setActivePage] = useState("Dashboard");

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <DefaultLayout
                            showSidebar={showSidebar}
                            setShowSidebar={setShowSidebar}
                        />
                    }
                >
                    <Route
                        path="/dashboard"
                        element={
                            <Dashboard
                                showSidebar={showSidebar}
                                setShowSidebar={setShowSidebar}
                                userFirstName={userFirstName}
                                userLastName={userLastName}
                                userEmail={userEmail}
                                userImg={userImg}
                                open={open}
                                setOpen={setOpen}
                                totalBalance={totalBalance}
                                income={income}
                            />
                        }
                    />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/budget" element={<Budget />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
