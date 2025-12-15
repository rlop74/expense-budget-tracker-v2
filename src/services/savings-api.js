import axios from "axios";

export const fetchSavings = async (id) => {
    try {
        const { data } = await axios.get(
            `http://localhost:3000/savings/${id}`
        );
        return data;
    } catch (err) {
        alert("Something went wrong");
        throw new Error(err);
    }
};

export const addSavings = async (newSavings) => {
    if (!newSavings.savings_amount) {
        alert("Fill out amount");
        return;
    }
    try {
        const { data } = await axios.post(
            `http://localhost:3000/savings/new-savings`,
            newSavings
        );
        return data;
    } catch (err) {
        alert("Something went wrong");
        throw new Error(err);
    }
};
