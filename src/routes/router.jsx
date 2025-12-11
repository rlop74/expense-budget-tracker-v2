import { createBrowserRouter } from "react-router";

import { Landing } from "../pages/Landing";
import { Login } from "../pages/Login";
import { Protected } from "../layout/Protected";
import { DefaultLayout } from "../layout/DefaultLayout";
import { Dashboard } from "../pages/Dashboard";
import { Transactions } from "../pages/Transactions";
import { Wallet } from "../pages/Wallet";
import { Goals } from "../pages/Goals";
import { Budget } from "../pages/Budget";
import { Analytics } from "../pages/Analytics";
import { Settings } from "../pages/Settings";

export const router = createBrowserRouter([
    { path: "/", Component: Landing },
    { path: "/login", Component: Login },
    {
        Component: Protected,
        children: [
            {
                Component: DefaultLayout,
                children: [
                    { path: "/dashboard", Component: Dashboard },
                    { path: "/transactions", Component: Transactions },
                    { path: "/wallet", Component: Wallet },
                    { path: "/goals", Component: Goals },
                    { path: "/budget", Component: Budget },
                    { path: "/analytics", Component: Analytics },
                    { path: "/settings", Component: Settings },
                ],
            },
        ],
    },
]);
