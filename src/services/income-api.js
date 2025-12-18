import axios from "axios";

export const updateIncome = async (amount, id) => {
    try {
        // update income
        await axios.post(
            `http://localhost:3000/users/update-income/${id}`,
            { updatedIncome: amount }
        );
    } catch (err) {
        alert("Something went wrong");
        throw new Error(err);
    }
};
