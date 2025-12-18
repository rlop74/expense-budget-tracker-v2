import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { supabase } from "./lib/supabase";
import axios from "axios";
import { useUserStore } from "./stores/user-store";

function App() {
    const setUser = useUserStore((state) => state.setUser);
    const getSession = async () => {
        const { data, error } = await supabase.auth.getSession();

        if (data) {
            const { data: profile, error: profileError } = await axios.get(
                `http://localhost:3000/users/${data.session.user.id}`
            );

            if (profileError) {
                setLoading(false);
                alert("Something went wrong", profileError.message);
                return;
            }

            setUser(profile); // set user to public table's data
        }
    };

    useEffect(() => {
        getSession();
    });

    return <RouterProvider router={router} />;
}

export default App;
