import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useIncome } from "../stores/income-store";

export const AddIncomeDialog = ({
    updateIncomeBtn,
    setUpdateIncomeBtn,
    dialogTitle,
    dialog,
}) => {
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState("");
    const updateIncome = useIncome((state) => state.updateIncome);

    return (
        <Dialog
            open={updateIncomeBtn}
            onClose={() => setUpdateIncomeBtn(false)} // Closes dialog when clicking outside or pressing Escape
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
                <Button onClick={() => setUpdateIncomeBtn(false)}>Cancel</Button>
                <Button
                    onClick={() => {
                        updateIncome(amount);
                        setUpdateIncomeBtn(false);
                    }}
                    autoFocus
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};
