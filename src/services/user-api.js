import axios from "axios";

export const fetchUser = async (id) => {
    try {
        const { data, error } = await axios.get(`http://localhost:3000/${id}`);
        return { data, error };
    } catch (err) {
        throw new Error(err);
    }
};
