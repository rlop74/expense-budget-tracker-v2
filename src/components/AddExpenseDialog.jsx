import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { useUserStore } from "../stores/user-store";
import { useExpenses } from "../stores/expenses-store";
import { addExpense } from "../services/expenses-api";
import { useAppStore } from "../stores/app-store";
import { useAccountInfo } from "../hooks/getAccountInfo";

export const AddExpenseDialog = ({
    isAddExpenseBtnOpen,
    setIsAddExpenseBtnOpen,
    dialogTitle,
    dialog,
}) => {
    const user = useUserStore((state) => state.user);
    const addNewExpense = useExpenses((state) => state.addNewExpense);
    const { allTransactions } = useAccountInfo();
    const setAllTransactions = useAppStore((state) => state.setAllTransactions);
    const [newExpense, setNewExpense] = useState({
        user_id: user.id,
        name: "",
        amount: "",
        category: "",
    });

    const handleAdd = async () => {
        // Validate inputs
        if (
            !newExpense.name.trim() ||
            !newExpense.amount ||
            !newExpense.category
        ) {
            alert("Please fill in all fields");
            return;
        }

        const data = await addExpense(newExpense);
        if (!data) return;
        addNewExpense(data);
        setAllTransactions([...allTransactions, data]);

        // clear inputs on click
        setNewExpense({
            user_id: user.id,
            name: "",
            amount: "",
            category: "",
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
                        value={newExpense.amount}
                        onChange={(e) =>
                            setNewExpense({
                                ...newExpense,
                                amount: e.target.value,
                            })
                        }
                    />
                    <input
                        type="text"
                        placeholder={`${dialog} name`}
                        className="border-1 p-5 rounded-full"
                        value={newExpense.name}
                        onChange={(e) =>
                            setNewExpense({
                                ...newExpense,
                                name: e.target.value,
                            })
                        }
                    />
                    <select
                        type="text"
                        placeholder={`${dialog} category`}
                        className="border-1 p-5 rounded-full"
                        value={newExpense.category}
                        onChange={(e) =>
                            setNewExpense({
                                ...newExpense,
                                category: e.target.value,
                            })
                        }
                    >
                        <option value="">Please select...</option>
                        <option value="Monthly Bills & Utilities">
                            Monthly Bills & Utilities
                        </option>
                        <option value="Education">Education</option>
                        <option value="Entertainment & Shopping">
                            Entertainment & Shopping
                        </option>
                        <option value="Food & Groceries">
                            Food & Groceries
                        </option>
                        <option value="Transport & Automotive">
                            Transport & Automotive
                        </option>
                        <option value="Health & Wellness">
                            Health & Wellness
                        </option>
                        <option value="Other">Other</option>
                    </select>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button
                    onClick={() => {
                        setIsAddExpenseBtnOpen(false); // close modal

                        // clear inputs on click
                        setNewExpense({
                            name: "",
                            amount: "",
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
