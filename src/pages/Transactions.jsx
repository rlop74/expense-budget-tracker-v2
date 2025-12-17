import { useExpenses } from "../stores/expenses-store";
import { useSavings } from "../stores/savings-store";
import { useAppStore } from "../stores/app-store";
import { formatDate } from "../services/format-date"; // data-fns

export const Transactions = () => {
    const loading = useAppStore((state) => state.loading);
    const allTransactions = useAppStore((state) => state.allTransactions);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">All Transactions</h1>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                {/* table header */}
                <div className="grid grid-cols-4 bg-gray-50 p-4 font-semibold">
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Name</div>
                    <div>Type</div>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500 m-10">
                        Loading transactions...
                    </p>
                ) : allTransactions.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">
                        No transactions yet
                    </p>
                ) : (
                    allTransactions
                        .sort(
                            (a, b) =>
                                new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((transaction) => (
                            <div className="grid grid-cols-4 p-4 border-b hover:bg-gray-100">
                                <div>{formatDate(transaction.created_at)}</div>
                                <div
                                    className={
                                        transaction.expense_amount
                                            ? "text-red-600"
                                            : "text-green-600"
                                    }
                                >
                                    {transaction.expense_amount ? "-" : "+"}
                                    {Number(
                                        transaction.expense_amount ||
                                            transaction.savings_amount
                                    ).toFixed(2)}
                                </div>
                                <div className="capitalize">
                                    {transaction.expense_name ||
                                        transaction.name}
                                </div>
                                <div className="">
                                    {transaction.expense_amount
                                        ? "Expense"
                                        : "Savings"}
                                </div>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
};
