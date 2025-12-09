import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import axios from "axios";

import { useUserStore } from "./stores/user-store";

import { DefaultLayout } from "./layout/DefaultLayout";
import { Dashboard } from "./pages/Dashboard";
import { Transactions } from "./pages/Transactions";
import { Wallet } from "./pages/Wallet";
import { Goals } from "./pages/Goals";
import { Budget } from "./pages/Budget";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";

function App() {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [expenseName, setExpenseName] = useState("");
    const [showSidebar, setShowSidebar] = useState(true);
    const [open, setOpen] = useState(false);
    const [activePage, setActivePage] = useState("Dashboard");

    const fetchUserById = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/users/1");
            setUser(data[0]);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        fetchUserById();
    }, []);

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
                                userFirstName={user?.first_name}
                                userLastName={user?.last_name}
                                userEmail={user?.email}
                                userImg={user?.img}
                                open={open}
                                setOpen={setOpen}
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
