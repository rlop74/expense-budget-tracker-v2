import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useSavings } from "../stores/savings-store";
import { useUserStore } from "../stores/user-store";

import axios from "axios";

export const AddSavingsDialog = ({
    isAddSavingsBtnOpen,
    setIsAddSavingsBtnOpen,
    dialogTitle,
    dialog,
}) => {
    const user = useUserStore((state) => state.user);
    const savings = useSavings((state) => state.savings);
    const setSavings = useSavings((state) => state.setSavings);
    const setTotalSavings = useSavings((state) => state.setTotalSavings);
    const [newSavings, setNewSavings] = useState({
        user_id: user.id,
        savings_amount: "",
    });

    const addSavings = async () => {
        if (!newSavings.savings_amount) {
            alert("Fill out amount");
            return;
        }
        try {
            const { data } = await axios.post(
                `http://localhost:3000/savings/new-savings`,
                newSavings
            );
            console.log(savings, data);
            setSavings([...savings, data]);
            setTotalSavings([...savings, data]);
            setIsAddSavingsBtnOpen(false);
            setNewSavings({
                user_id: user.id,
                savings_amount: "",
            });
        } catch (err) {
            alert("Something went wrong");
            throw new Error(err);
        }
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
                    {/* {inputItems.map((inputItem) => <input type="number" placeholder={`${dialog} ${inputItem}`} className="border-1 w-100"/>)} */}
                    <input
                        type="number"
                        placeholder={`${dialog} amount`}
                        className="border-1 p-5 rounded-full"
                        value={newSavings.savings_amount}
                        onChange={(e) =>
                            setNewSavings({
                                ...newSavings,
                                savings_amount: e.target.value,
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
                    onClick={addSavings}
                    className="border-1 border-gray-300 p-2 rounded-xl bg-violet-500/30"
                    autoFocus
                >
                    Confirm
                </button>
            </DialogActions>
        </Dialog>
    );
};
