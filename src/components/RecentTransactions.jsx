import { useExpenses } from "../stores/expenses-store";
import { formatDate } from "../services/format-date";
import { useSavings } from "../stores/savings-store";

export const RecentTransactions = () => {
    const allExpenses = useExpenses((state) => state.allExpenses);
    const savings = useSavings((state) => state.savings);
    const transactions = [...allExpenses, ...savings];
    const tableHeaders = ["Date", "Amount", "Payment name"]; // add catergory

    return (
        <div className="mt-4 overflow-y-auto max-h-60">
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
            <div className="p-5">
                {transactions
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
                                    transaction.expense_amount
                                        ? "text-red-600"
                                        : "text-green-600"
                                }`}
                            >
                                {transaction.expense_amount ? "-" : "+"}
                                {Number(
                                    transaction.expense_amount ||
                                        transaction.savings_amount
                                ).toFixed(2)}
                            </p>
                            <p className="text-right capitalize">
                                {transaction.expense_name || transaction.name}
                            </p>
                        </li>
                    ))}
            </div>
        </div>
    );
};
