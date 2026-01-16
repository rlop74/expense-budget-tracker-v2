import { useState } from "react";
import { useAccountInfo } from "../hooks/getAccountInfo";
import { useBills } from "../stores/bills-store";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { addBills } from "../services/bills-api";
import { Dialog } from "../components/Dialog";

export const Bills = () => {
    const { loading } = useAccountInfo();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddBillsOpen, setIsAddBillsOpen] = useState(false);
    const [billToEdit, setBillToEdit] = useState(null);

    const allBills = useBills((state) => state.allBills);
    const setAllBills = useBills((state) => state.setAllBills);
    const totalBill = useBills((state) => state.totalBill);
    const setTotalBills = useBills((state) => state.setTotalBills);
    const updateBill = useBills((state) => state.updateBill);

    const addNewBill = useBills((state) => state.addNewBill);
    const [newBill, setNewBill] = useState({
        name: "",
        amount: "",
    });

    const handleAddBills = async () => {
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

    const handleDeleteBill = async (id) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:3000/bills/delete-bill/${id}`
            );
            const updatedBills = allBills.filter((bill) => bill.id !== id);
            setAllBills(updatedBills);
            setTotalBills(updatedBills);
        } catch (err) {
            console.log("Failed to delete bill: ", err);
            alert("Something went wrong");
        }
    };

    const handleEditBill = async () => {
        try {
            const { data } = await axios.post(
                `http://localhost:3000/bills/edit-bill/${billToEdit.id}`,
                billToEdit
            );

            // update store/UI and close modal
            updateBill(data);
            setIsEditOpen(false);
        } catch (err) {
            console.log("Failed to edit bill: ", err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900">
                    Monthly Bills
                </h1>
                <button
                    onClick={() => setIsAddBillsOpen(true)}
                    className="bg-violet-600 hover:!bg-violet-700 text-white px-6 py-3 rounded-xl shadow-md transition-colors"
                >
                    + Add Bill
                </button>
            </div>

            {/* total card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-5">
                <div className="p-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                    <p className="text-violet-100 text-lg">
                        Total monthly bills
                    </p>
                    {loading ? (
                        <div className="mt-4 h-10 w-48 bg-white/20 rounded animate-pulse"></div>
                    ) : (
                        <p className="text-4xl font-bold mt-3">
                            $
                            {totalBill
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </p>
                    )}
                </div>
            </div>

            {/* bills list */}
            <div>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                    <div className="divide-y divide-gray-300">
                        {loading ? (
                            <p className="p-8 text-center text-gray-500">
                                Loading bills...
                            </p>
                        ) : allBills.length === 0 ? (
                            <div className="p12 text-center text-gray-500">
                                <p className="text-lg">No bills added yet.</p>
                                <p className="mt-2">
                                    Click "Add Bill" to get started.
                                </p>
                            </div>
                        ) : (
                            allBills
                                .sort((a, b) => a.id - b.id)
                                .map((bill) => (
                                    <div
                                        key={bill.id}
                                        className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <p className="text-xl font-semibold capitalize">
                                                {bill.name}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Due on the 1st • Recurring
                                                monthly
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-8">
                                            <p className="text-2xl font-bold text-gray-900">
                                                $
                                                {Number(bill.amount)
                                                    .toFixed(2)
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                    )}
                                            </p>

                                            {/*  action buttons */}
                                            <div>
                                                <button
                                                    onClick={() => {
                                                        setIsEditOpen(true);
                                                        setBillToEdit({
                                                            id: bill.id,
                                                            name: bill.name,
                                                            amount: bill.amount,
                                                        });
                                                    }}
                                                    className="p-2.5 rounded-lg text-gray-600 hover:!bg-gray-200 hover:!text-violet-600 transition-colors"
                                                >
                                                    <Pencil
                                                        size={20}
                                                        strokeWidth={2}
                                                    />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteBill(
                                                            bill.id
                                                        )
                                                    }
                                                    className="p-2.5 rounded-lg text-gray-600 hover:!bg-red-100 hover:!text-red-600 transition-colors"
                                                >
                                                    <Trash2
                                                        size={20}
                                                        strokeWidth={2}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                </div>
            </div>

            {/* modals */}
            {isAddBillsOpen && (
                <Dialog
                    title="Add Bill"
                    setIsOpen={setIsAddBillsOpen}
                    handleFunction={handleAddBills}
                >
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bill Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                placeholder="e.g. Rent"
                                value={newBill.name}
                                onChange={(e) =>
                                    setNewBill({
                                        ...newBill,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bill Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                                    $
                                </span>
                                <input
                                    type="number"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                    placeholder="0.00"
                                    value={newBill.amount}
                                    onChange={(e) =>
                                        setNewBill({
                                            ...newBill,
                                            amount: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Dialog>
            )}

            {isEditOpen && (
                <Dialog
                    title={`Edit Bill: ${billToEdit.name}`}
                    setIsOpen={setIsEditOpen}
                    handleFunction={handleEditBill}
                >
                    <div className="p-6 space-y-6">
                        <div>
                            <label
                                htmlFor="bill-name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Bill Name
                            </label>
                            <input
                                id="bill-name"
                                type="text"
                                defaultValue={billToEdit?.name || ""}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                placeholder="e.g. Netflix"
                                onChange={(e) =>
                                    setBillToEdit({
                                        ...billToEdit,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="bill-amount"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Monthly Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                                    $
                                </span>
                                <input
                                    id="bill-amount"
                                    type="number"
                                    step="0.01"
                                    defaultValue={billToEdit?.amount || ""}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                    placeholder="0.00"
                                    onChange={(e) =>
                                        setBillToEdit({
                                            ...billToEdit,
                                            amount: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        {/* You can add more fields later, e.g. due date, category, etc. */}
                    </div>
                </Dialog>
            )}
        </div>
    );
};
