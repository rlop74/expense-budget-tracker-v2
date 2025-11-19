import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useTotalExpense } from '../stores/expenses-store';
import { useTotalSavings } from "../stores/savings-store";

export const AddSavingsDialog = ({ addSavingsBtn, setAddSavingsBtn, dialogTitle, dialog }) => {
    // const inputItems = ["amount", "name"];
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState("");
    const addExpense = useTotalExpense((state) => state.addExpense);
    const addSavings = useTotalSavings((state) => state.addSavings);

    return (
        <Dialog
            open={addSavingsBtn}
            onClose={() => setAddSavingsBtn(false)} // Closes dialog when clicking outside or pressing Escape
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
                <Button onClick={() => setAddSavingsBtn(false)}>Cancel</Button>
                <Button
                    onClick={() => {
                        addSavings(amount);
                        setAddSavingsBtn(false);
                    }}
                    autoFocus
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};
