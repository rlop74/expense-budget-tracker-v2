import axios from "axios";

export const fetchGoals = async () => {
    try {
        const { data } = await axios.get("http://localhost:3000/goals");
        return data;
    } catch (err) {
        console.error("Failed to fetch goals: ", err);
        alert("Something went wrong");
    }
};
