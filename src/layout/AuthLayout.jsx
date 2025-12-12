import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-dom";
import { supabase } from "../lib/supabase.js";

export const AuthLayout = () => {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);

    useEffect(() => {
        // check current session on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });
    }, []);

    return auth;
};
