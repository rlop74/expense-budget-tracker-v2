import { useState } from "react";
import { AddBillsDialog } from "../components/AddBillDialog";
import { useAccountInfo } from "../hooks/getAccountInfo";
import { useBills } from "../stores/bills-store";
import { Pencil, Trash2 } from "lucide-react";

export const Bills = () => {
    const { loading } = useAccountInfo();
    const allBills = useBills((state) => state.allBills);
    const totalBill = useBills((state) => state.totalBill);
    const [isAddBillsOpen, setIsAddBillsOpen] = useState(false);

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
                            allBills.map((bill) => (
                                <div
                                    key={bill.id}
                                    className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex-1">
                                        <p className="text-xl font-semibold capitalize">
                                            {bill.name}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Due on the 1st • Recurring monthly
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
                                            <button className="p-2.5 rounded-lg text-gray-600 hover:!bg-gray-200 hover:!text-violet-600 transition-colors">
                                                <Pencil
                                                    size={20}
                                                    strokeWidth={2}
                                                />
                                            </button>
                                            <button className="p-2.5 rounded-lg text-gray-600 hover:!bg-red-100 hover:!text-red-600 transition-colors">
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
            <AddBillsDialog
                isAddBillsOpen={isAddBillsOpen}
                setIsAddBillsOpen={setIsAddBillsOpen}
                dialogTitle="Add bill"
                dialog="Enter bill"
            />
        </div>
    );
};
