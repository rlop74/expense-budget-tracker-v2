import axios from "axios";

export const fetchBills = async () => {
    try {
        const { data } = await axios.get("http://localhost:3000/bills");
        return data;
    } catch (err) {
        console.error("Failed to get bills: ", err);
        alert("Something went wrong");
    }
};
