// ask user to login, if no active session
// should not allow user to view protected components without matching creds
// redirect to signup or back to login page

import { Outlet } from "react-router";

import { useUserStore } from "../stores/user-store";

export const Protected = () => {
    const user = useUserStore((state) => state.user);
    
    if (user) {
        return <Outlet />
    }

    return <Login />
}