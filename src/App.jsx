import { useEffect } from "react";
import { RouterProvider } from "react-router";
import axios from "axios";

import { router } from "./routes/router";

function App() {
    

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
