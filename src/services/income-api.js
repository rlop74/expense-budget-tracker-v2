import axios from "axios";
import { useUserStore } from "../stores/user-store.js";

export const updateIncome = async (amount) => {
    const setUser = useUserStore((state) => state.setUser);

    try {
        // update income
        await axios.post(
            `http://localhost:3000/users/update-income/${user.auth_id}`,
            { updatedIncome: amount }
        );

        // fetch user again for fresh data
        const { data } = await axios.get(
            `http://localhost:3000/users/${user.auth_id}`
        );

        // set fresh user
        setUser(data);
    } catch (err) {
        alert("Something went wrong");
        throw new Error(err);
    }
};
