import axios from "axios";

export const fetchBudget = async () => {
    try {
        const { data } = await axios.get("http://localhost:3000/budget");
        return data;
    } catch (err) {
        console.error("Failed to fetch budget: ", err)
        alert("Something went wrong");
    }
}