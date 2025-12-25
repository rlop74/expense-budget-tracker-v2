import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useUserStore } from "../stores/user-store";
import { addSavings } from "../services/savings-api";
import { useSavings } from "../stores/savings-store";
import { useAppStore } from "../stores/app-store";
import { useAccountInfo } from "../hooks/getAccountInfo";

export const AddSavingsDialog = ({
    isAddSavingsBtnOpen,
    setIsAddSavingsBtnOpen,
    dialogTitle,
    dialog,
}) => {
    const user = useUserStore((state) => state.user);
    const addTotalSavings = useSavings((state) => state.addTotalSavings);
    const { allTransactions } = useAccountInfo();
    const setAllTransactions = useAppStore((state) => state.setAllTransactions);
    const [newSavings, setNewSavings] = useState({
        user_id: user.id,
        amount: "",
    });

    const handleAdd = async () => {
        const data = await addSavings(newSavings);
        addTotalSavings(data);
        setAllTransactions([...allTransactions, data])

        setNewSavings({
            user_id: user.id,
            amount: "",
        });

        setIsAddSavingsBtnOpen(false);
    };

    return (
        <Dialog
            open={isAddSavingsBtnOpen}
            onClose={() => setIsAddSavingsBtnOpen(false)} // Closes dialog when clicking outside or pressing Escape
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
                        value={newSavings.amount}
                        onChange={(e) =>
                            setNewSavings({
                                ...newSavings,
                                amount: e.target.value,
                            })
                        }
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button
                    onClick={() => {
                        setIsAddSavingsBtnOpen(false);
                        setAmount();
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
