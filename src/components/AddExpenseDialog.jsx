import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useTotalExpense } from "../stores/expenses-store";

export const AddExpenseDialog = ({
    addExpenseBtn,
    setAddExpenseBtn,
    dialogTitle,
    dialog,
}) => {
    const [amount, setAmount] = useState();
    const [name, setName] = useState("");
    const addExpense = useTotalExpense((state) => state.addExpense);

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
                    {/* {inputItems.map((inputItem) => <input type="number" placeholder={`${dialog} ${inputItem}`} className="border-1 w-100"/>)} */}
                    <input
                        type="number"
                        placeholder={`${dialog} amount`}
                        className="border-1 p-5 rounded-full"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder={`${dialog} name`}
                        className="border-1 p-5 rounded-full"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button
                    onClick={() => {
                        setAddExpenseBtn(false);
                        setAmount();
                        setName();
                    }}
                    className="border-1 border-gray-300 p-2 rounded-xl bg-violet-500/30"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        addExpense(amount);
                        setAddExpenseBtn(false);
                        setAmount();
                        setName();
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
