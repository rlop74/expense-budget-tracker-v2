import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { useExpenses } from "../stores/expenses-store";
import axios from "axios";

export const AddExpenseDialog = ({
    addExpenseBtn,
    setAddExpenseBtn,
    dialogTitle,
    dialog,
}) => {
    const [newExpense, setNewExpense] = useState({
        expense_name: "",
        expense_amount: "",
    });
    const setAllExpenses = useExpenses((state) => state.setAllExpenses);
    const setTotalExpense = useExpenses((state) => state.setTotalExpense);
    const allExpenses = useExpenses((state) => state.allExpenses);

    const addExpense = async () => {
        // Validate inputs
        if (!newExpense.expense_name.trim() || !newExpense.expense_amount) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const { data } = await axios.post(
                "http://localhost:3000/expenses/add-expense",
                newExpense
            );
            setAllExpenses([...allExpenses, data]);
            setTotalExpense([...allExpenses, data]);

            // clear inputs on click
            setNewExpense({
                expense_name: "",
                expense_amount: "",
            });

            setAddExpenseBtn(false);
        } catch (err) {
            console.error("Failed to add expense: ", err);
            alert("Something went wrong");
        }
    };

    return (
        <Dialog
            open={addExpenseBtn}
            onClose={() => setAddExpenseBtn(false)} // Closes dialog when clicking outside or pressing Escape
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            fullWidth={true}
        >
            <DialogTitle id="dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="dialog-description"
                    className="flex flex-col gap-5"
                >
                    <input
                        type="number"
                        placeholder={`${dialog} amount`}
                        className="border-1 p-5 rounded-full"
                        value={newExpense.expense_amount}
                        onChange={(e) =>
                            setNewExpense({
                                ...newExpense,
                                expense_amount: e.target.value,
                            })
                        }
                    />
                    <input
                        type="text"
                        placeholder={`${dialog} name`}
                        className="border-1 p-5 rounded-full"
                        value={newExpense.expense_name}
                        onChange={(e) =>
                            setNewExpense({
                                ...newExpense,
                                expense_name: e.target.value,
                            })
                        }
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button
                    onClick={() => {
                        setAddExpenseBtn(false); // close modal

                        // clear inputs on click
                        setNewExpense({
                            expense_name: "",
                            expense_amount: "",
                        });
                    }}
                    className="border-1 border-gray-300 p-2 rounded-xl bg-violet-500/30"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        addExpense(newExpense);
                    }}
                    className="border-1 border-gray-300 p-2 rounded-xl bg-violet-500/30"
                    autoFocus
                >
                    Confirm
                </button>
            </DialogActions>
        </Dialog>
    );
};
