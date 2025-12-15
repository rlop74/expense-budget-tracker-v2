import axios from "axios";

export const fetchExpenses = async (id) => {
    try {
        const { data } = await axios.get(
            `http://localhost:3000/expenses/${id}`
        );
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

export const addExpense = async (newExpense) => {
    try {
        const { data } = await axios.post(
            "http://localhost:3000/expenses/add-expense",
            newExpense
        );
        return data;
    } catch (err) {
        console.error("Failed to add expense: ", err);
        alert("Something went wrong");
    }
};
