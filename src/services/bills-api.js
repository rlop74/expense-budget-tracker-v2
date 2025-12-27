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

export const addBills = async (newBill) => {
    try {
        const { data } = await axios.post(
            "http://localhost:3000/bills/add-bill",
            newBill
        );
        return data;
    } catch (err) {
        console.error("Failed to add bill: ", err);
        alert("Something went wrong");
    }
};
