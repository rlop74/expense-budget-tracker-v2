import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { useBills } from "../stores/bills-store";
import { addBills } from "../services/bills-api";

export const AddBillsDialog = ({
    isAddBillsOpen,
    setIsAddBillsOpen,
    dialogTitle,
    dialog,
}) => {
    const addNewBill = useBills((state) => state.addNewBill);
    const [newBill, setNewBill] = useState({
        name: "",
        amount: "",
    });

    const handleAdd = async () => {
        // Validate inputs
        if (!newBill.name.trim() || !newBill.amount) {
            alert("Please fill in all fields");
            return;
        }

        const data = await addBills(newBill);
        if (!data) return;
        addNewBill(data);

        // clear inputs on click
        setNewBill({
            name: "",
            amount: "",
        });

        setIsAddBillsOpen(false);
    };

    return (
        <Dialog
            open={isAddBillsOpen}
            onClose={() => setIsAddBillsOpen(false)} // Closes dialog when clicking outside or pressing Escape
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
                        value={newBill.amount}
                        onChange={(e) =>
                            setNewBill({
                                ...newBill,
                                amount: e.target.value,
                            })
                        }
                    />
                    <input
                        type="text"
                        placeholder={`${dialog} name`}
                        className="border-1 p-5 rounded-full"
                        value={newBill.name}
                        onChange={(e) =>
                            setNewBill({
                                ...newBill,
                                name: e.target.value,
                            })
                        }
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button
                    onClick={() => {
                        setIsAddBillsOpen(false); // close modal

                        // clear inputs on click
                        setNewBill({
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
