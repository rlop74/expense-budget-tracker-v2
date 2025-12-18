// ask user to login, if no active session
// should not allow user to view protected components without matching creds
// redirect to signup or back to login page

import { Outlet } from "react-router-dom";
import { Login } from "../pages/Login";
import { useAccountInfo } from "../hooks/getAccountInfo";

export const Protected = () => {
    const { allTransactions, loading, user } = useAccountInfo();

    if (user) {
        return <Outlet context={{ allTransactions }} />;
    }

    if (!user || loading) {
        return (
            <div className="h-screen flex justify-center items-center text-4xl">
                Loading...{" "}
            </div>
        );
    }

    return <Login />;
};
