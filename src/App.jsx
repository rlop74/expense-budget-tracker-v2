import { useEffect } from "react";
import { RouterProvider } from "react-router";
import axios from "axios";

import { router } from "./routes/router";
import { useUserStore } from "./stores/user-store";

function App() {

    return <RouterProvider router={router} />
}

export default App;
