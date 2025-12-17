import { createBrowserRouter } from "react-router-dom";

import RouteErrorBoundary from "../pages/RouteErrorBoundary";
import { Landing } from "../pages/Landing";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login";
import { Protected } from "../layout/Protected";
import { DefaultLayout } from "../layout/DefaultLayout";
import { Dashboard } from "../pages/Dashboard";
import { Transactions } from "../pages/Transactions";
import { Bills } from "../pages/Bills";
import { Goals } from "../pages/Goals";
import { Budget } from "../pages/Budget";
import { Analytics } from "../pages/Analytics";
import { Settings } from "../pages/Settings";
import { Help } from "../pages/Help";

export const router = createBrowserRouter([
    { path: "/", Component: Landing },
    { path: "/sign-up", Component: SignUp },
    { path: "/login", Component: Login },
    {
        Component: Protected,
        ErrorBoundary: RouteErrorBoundary,
        children: [
            {
                Component: DefaultLayout,
                children: [
                    { path: "/dashboard", Component: Dashboard },
                    { path: "/transactions", Component: Transactions },
                    { path: "/bills", Component: Bills },
                    { path: "/goals", Component: Goals },
                    { path: "/budget", Component: Budget },
                    { path: "/analytics", Component: Analytics },
                    { path: "/settings", Component: Settings },
                    { path: "/help", Component: Help },
                ],
            },
        ],
    },
]);
