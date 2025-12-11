import { useEffect } from "react";
import { RouterProvider } from "react-router";
import axios from "axios";

import { router } from "./routes/router";
import { useUserStore } from "./stores/user-store";

function App() {
    const setUser = useUserStore((state) => state.setUser);

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

    return <RouterProvider router={router} />
}

export default App;
