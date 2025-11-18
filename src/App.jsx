import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

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
    const [userImg, setuserImg] = useState(
        "https://media.licdn.com/dms/image/v2/D4E03AQGy1OWBIfOy2A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1691031045223?e=1764201600&v=beta&t=O2Nwj1howzF6UzghUIPliAHVF8_z0qfA3KVrEAACU4s"
    );
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [totalBalance, setTotalBalance] = useState(0);
    const [income, setIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    // const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseName, setExpenseName] = useState("");
    const [totalSavings, setTotalSavings] = useState(0);
    const [showSidebar, setShowSidebar] = useState(true);
    const [open, setOpen] = useState(false);
    const [activePage, setActivePage] = useState("Dashboard");
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "Sun");

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <DefaultLayout
                            showSidebar={showSidebar}
                            setShowSidebar={setShowSidebar}
                            theme={theme}
                            setTheme={setTheme}
                        />
                    }
                >
                    <Route
                        path="/dashboard"
                        element={
                            <Dashboard
                                showSidebar={showSidebar}
                                setShowSidebar={setShowSidebar}
                                theme={theme}
                                setTheme={setTheme}
                                userFirstName={userFirstName}
                                userLastName={userLastName}
                                userEmail={userEmail}
                                userImg={userImg}
                                open={open}
                                setOpen={setOpen}
                                setTotalExpense={setTotalExpense}
                                totalBalance={totalBalance}
                                income={income}
                                totalExpense={totalExpense}
                                totalSavings={totalSavings}
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
