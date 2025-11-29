import { useTotalExpense } from "../stores/expenses-store";
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

export const RecentTransactions = () => {
    const allExpenses = useTotalExpense((state) => state.allExpenses);
    const tableHeaders = ["Date", "Amount", "Payment name"]; // add catergory

    const formatDate = (date) => {
        const d = new Date(date);

        if (isToday(d)) {
            return formatDistanceToNow(d, { addSuffix: true }); // "5 minutes ago"
        }
        if (isYesterday(d)) return "Yesterday";
        if (d.getFullYear() === new Date().getFullYear()) {
            return format(d, "MMM d"); // "Nov 29"
        }
        return format(d, "MMM d, yyyy"); // "Nov 29 Nov, 2024
    };

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
                {allExpenses
                    .map((expense) => (
                    <li
                        key={expense.id}
                        className="
                            list-none grid grid-cols-3 text-sm px-2 py-3
                            border-b border-gray-200 hover:bg-gray-50
                            last:border-b-0
                        "
                    >
                        <p>{formatDate(expense.createdAt)}</p>
                        <p className="text-center font-bold">
                            {expense.amount.toFixed(2)}
                        </p>
                        <p className="text-right">{expense.name}</p>
                    </li>
                ))}
            </div>
        </div>
    );
};