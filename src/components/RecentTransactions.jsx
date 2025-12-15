import { useExpenses } from "../stores/expenses-store";
import { formatDate } from "../services/format-date";

export const RecentTransactions = () => {
    const allExpenses = useExpenses((state) => state.allExpenses);
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
                {allExpenses
                    // .slice()
                    .sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
                    .map((expense) => (
                    <li
                        key={expense.id}
                        className="
                            list-none grid grid-cols-3 text-sm px-2 py-3
                            border-b border-gray-200 hover:bg-gray-50
                            last:border-b-0
                        "
                    >
                        <p>{formatDate(expense.created_at)}</p>
                        <p className="text-center font-bold">
                            {Number(expense.expense_amount).toFixed(2)}
                        </p>
                        <p className="text-right">{expense.expense_name}</p>
                    </li>
                ))}
            </div>
        </div>
    );
};