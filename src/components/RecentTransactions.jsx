import { formatDate } from "../services/format-date";
import { useAppStore } from "../stores/app-store";

export const RecentTransactions = () => {
    const transactions = useAppStore((state) => state.allTransactions)
    const tableHeaders = ["Date", "Amount", "Payment name"]; // add catergory
    const loading = useAppStore((state) => state.loading);

    return (
        <div className="mt-4 overflow-y-auto max-h-60">
            {/* Table Title row */}
            <div className="grid grid-cols-3 bg-violet-50 p-3 text-violet-800 font-semibold rounded-full sticky top-0">
                {tableHeaders.map((header, index) => (
                    <header
                        key={index}
                        className="list-none text-md text-center"
                    >
                        {header}
                    </header>
                ))}
            </div>

            {/* Table Contents */}
            <div className="p-5">
                {loading ? (
                    <p className="text-center text-gray-500 mt-10">
                        Loading transactions...
                    </p>
                ) : (
                    transactions
                        .sort(
                            (a, b) =>
                                new Date(b.created_at) - new Date(a.created_at)
                        )
                        .slice(0, 10)
                        .map((transaction) => (
                            <li
                                key={transaction.id}
                                className="
                            list-none grid grid-cols-3 text-sm px-2 py-3
                            border-b border-gray-200 hover:bg-gray-50
                            last:border-b-0
                        "
                            >
                                <p>{formatDate(transaction.created_at)}</p>
                                <p
                                    className={`text-center font-bold ${
                                        transaction.type === "expense"
                                            ? "text-red-600"
                                            : "text-green-600"
                                    }`}
                                >
                                    {transaction.type === "expense" ? "-" : "+"}
                                    {Number(transaction.amount).toFixed(2)}
                                </p>
                                <p className="text-right capitalize">
                                    {transaction.name}
                                </p>
                            </li>
                        ))
                )}
            </div>
        </div>
    );
};
