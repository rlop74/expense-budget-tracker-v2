import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useUserStore } from "../stores/user-store.js";
import axios from "axios";

export const AddIncomeDialog = ({
    isUpdateIncomeBtnOpen,
    setIsUpdateIncomeBtnOpen,
    dialogTitle,
    dialog,
}) => {
    const [amount, setAmount] = useState();
    const [name, setName] = useState("");
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    const updateIncomeInDb = async (amount) => {
        try {
            // update income
            await axios.post(
                `http://localhost:3000/users/update-income/${user.auth_id}`,
                { updatedIncome: amount }
            );

            // fetch user again for fresh data
            const { data } = await axios.get(
                `http://localhost:3000/users/${user.auth_id}`
            );
            
            // set fresh user
            setUser(data);
        } catch (err) {
            alert("Something went wrong");
            throw new Error(err);
        }
    };

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
                        updateIncomeInDb(amount);
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
