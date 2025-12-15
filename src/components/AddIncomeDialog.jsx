import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useUserStore } from "../stores/user-store.js";
import { updateIncome } from "../services/income-api.js";

export const AddIncomeDialog = ({
    isUpdateIncomeBtnOpen,
    setIsUpdateIncomeBtnOpen,
    dialogTitle,
    dialog,
}) => {
    const [amount, setAmount] = useState();

    return (
        <Dialog
            open={isUpdateIncomeBtnOpen}
            onClose={() => setIsUpdateIncomeBtnOpen(false)} // Closes dialog when clicking outside or pressing Escape
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            maxWidth="sm"
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
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button
                    onClick={() => {
                        setIsUpdateIncomeBtnOpen(false);
                        setAmount();
                    }}
                    className="border-1 border-gray-300 p-2 rounded-xl bg-violet-500/30"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        updateIncome(amount);
                        setIsUpdateIncomeBtnOpen(false);
                        setAmount();
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
