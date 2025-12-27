import { useState } from "react";
import { AddBillsDialog } from "../components/AddBillDialog";
import { useAccountInfo } from "../hooks/getAccountInfo";
import { useBills } from "../stores/bills-store";

export const Bills = () => {
    const { loading } = useAccountInfo();
    const allBills = useBills((state) => state.allBills);
    const totalBill = useBills((state) => state.totalBill);
    const [isAddBillsOpen, setIsAddBillsOpen] = useState(false);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Monthly Bills</h1>
                <button
                    onClick={() => setIsAddBillsOpen(true)}
                    className="bg-violet-600 text-white px-6 py-3 rounded-lg"
                >
                    + Add Bill
                </button>
            </div>

            <div className="bg-white rounded-xl shadow">
                <div className="p-6 border-b bg-gray-50">
                    <p className="text-gray-600">Total monthly bills</p>
                    {loading ? (
                        <p>Loading total monthly bills...</p>
                    ) : (
                        <p className="text-3xl font-bold mt-2">
                            ${totalBill.toFixed(2).toLocaleString()}
                        </p>
                    )}
                </div>

                <div className="divide-y">
                    {/* Bill row */}
                    {loading ? (
                        <p className="p-6 flex items-center hover:bg-gray-50">
                            Loading bills...
                        </p>
                    ) : (
                        allBills.map((bill) => (
                            <div className="p-6 flex justify-between items-center hover:bg-gray-50">
                                <div>
                                    <p className="font-semibold capitalize">{bill.name}</p>
                                    <p className="text-sm text-gray-500">
                                        Due on the 1st
                                    </p>
                                </div>
                                <p className="text-2xl font-medium">
                                    ${Number(bill.amount).toFixed(2).toLocaleString()}
                                </p>
                            </div>
                        ))
                    )}
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
