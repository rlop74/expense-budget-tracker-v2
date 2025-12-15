import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { useUserStore } from "../stores/user-store";
import { useExpenses } from "../stores/expenses-store";
import { addExpense } from "../services/expenses-api";

export const AddExpenseDialog = ({
    isAddExpenseBtnOpen,
    setIsAddExpenseBtnOpen,
    dialogTitle,
    dialog,
}) => {
    const user = useUserStore((state) => state.user);
    const addNewExpense = useExpenses((state) => state.addNewExpense);
    const setTotalExpense = useExpenses((state) => state.setTotalExpense);
    const [newExpense, setNewExpense] = useState({
        user_id: user.id,
        expense_name: "",
        expense_amount: "",
    });

    const handleAdd = async () => {
        // Validate inputs
        if (!newExpense.expense_name.trim() || !newExpense.expense_amount) {
            alert("Please fill in all fields");
            return;
        }

        const data = await addExpense(newExpense);
        if (!data) return;
        addNewExpense(data);

        // clear inputs on click
        setNewExpense({
            user_id: user.id,
            expense_name: "",
            expense_amount: "",
        });
        
        setIsAddExpenseBtnOpen(false);
    };

    return (
        <Dialog
            open={isAddExpenseBtnOpen}
            onClose={() => setIsAddExpenseBtnOpen(false)} // Closes dialog when clicking outside or pressing Escape
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
                        setIsAddExpenseBtnOpen(false); // close modal

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
                    onClick={handleAdd}
                    className="border-1 border-gray-300 p-2 rounded-xl bg-violet-500/30"
                    autoFocus
                >
                    Confirm
                </button>
            </DialogActions>
        </Dialog>
    );
};
