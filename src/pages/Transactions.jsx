import { useState, useMemo } from "react";
import { useAppStore } from "../stores/app-store";
import { formatDate } from "../services/format-date"; // date-fns
import { Search } from "lucide-react";

export const Transactions = () => {
    const loading = useAppStore((state) => state.loading);
    const allTransactions = useAppStore((state) => state.allTransactions);

    // Search and filter state
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all"); // "all", "expense", "savings"

    // Sorting state
    const [sortField, setSortField] = useState("date");
    const [sortDirection, setSortDirection] = useState("desc");

    // Handle sorting
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection(field === "date" ? "desc" : "asc");
        }
    };

    // Filter + Search + Sort logic using useMemo for performance
    const filteredAndSortedTransactions = useMemo(() => {
        let filtered = [...allTransactions];

        // Apply type filter
        if (typeFilter !== "all") {
            filtered = filtered.filter((t) => t.type === typeFilter);
        }

        // Apply search
        if (searchTerm.trim()) {
            const lowerSearch = searchTerm.toLowerCase();
            filtered = filtered.filter((t) => {
                return (
                    t.name.toLowerCase().includes(lowerSearch) ||
                    t.amount.toString().includes(lowerSearch) ||
                    formatDate(t.created_at).toLowerCase().includes(lowerSearch)
                );
            });
        }

        // Apply sorting
        return filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortField) {
                case "date":
                    aValue = new Date(a.created_at);
                    bValue = new Date(b.created_at);
                    break;
                case "amount":
                    aValue = Number(a.amount);
                    bValue = Number(b.amount);
                    break;
                case "name":
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case "type":
                    aValue = a.type;
                    bValue = b.type;
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [allTransactions, searchTerm, typeFilter, sortField, sortDirection]);

    const getSortIcon = (field) => {
        if (sortField !== field) return null;
        return sortDirection === "asc" ? "↑" : "↓";
    };

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
                All Transactions
            </h1>

            {/* Search and Filter Controls */}
            <div className="mb-5 flex flex-col sm:flex-row gap-4"> {/* anything larger than sm, flex-row */}
                <div className="flex-1">
                    <div className="relative">
                        <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                            <Search className="text-gray-400 h-5 w-5"/>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, amount, or date..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition"
                        />
                    </div>
                </div>

                <div className="sm:w-64">
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition"
                    >
                        <option value="all">All Types</option>
                        <option value="expense">Expense</option>
                        <option value="saving">Savings</option>
                    </select>
                </div>
            </div>

            {/* Results count */}
            {allTransactions.length > 0 && (
                <p className="text-sm text-gray-600 mb-4">
                    Showing {filteredAndSortedTransactions.length} of{" "}
                    {allTransactions.length} transactions
                </p>
            )}

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-xl">
                <div className="">
                    <table className="w-full divide-y divide-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th
                                    onClick={() => handleSort("date")}
                                    className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors select-none"
                                >
                                    <div className="flex gap-1">
                                        Date
                                        <span className="text-gray-400">
                                            {getSortIcon("date")}
                                        </span>
                                    </div>
                                </th>
                                <th
                                    onClick={() => handleSort("amount")}
                                    className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors select-none"
                                >
                                    <div className="flex gap-1">
                                        Amount
                                        <span className="text-gray-400">
                                            {getSortIcon("amount")}
                                        </span>
                                    </div>
                                </th>
                                <th
                                    onClick={() => handleSort("name")}
                                    className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors select-none"
                                >
                                    <div className="flex gap-1">
                                        Name
                                        <span className="text-gray-400">
                                            {getSortIcon("name")}
                                        </span>
                                    </div>
                                </th>
                                <th
                                    onClick={() => handleSort("type")}
                                    className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors select-none"
                                >
                                    <div className="flex gap-1">
                                        Type
                                        <span className="text-gray-400">
                                            {getSortIcon("type")}
                                        </span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-12 text-center text-gray-500"
                                    >
                                        Loading transactions...
                                    </td>
                                </tr>
                            ) : filteredAndSortedTransactions.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="py-12 text-center text-gray-500"
                                    >
                                        {searchTerm || typeFilter !== "all"
                                            ? "No transactions match your search or filter."
                                            : "No transactions yet"}
                                    </td>
                                </tr>
                            ) : (
                                filteredAndSortedTransactions.map(
                                    (transaction, index) => (
                                        <tr
                                            key={transaction.id || index}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {formatDate(
                                                    transaction.created_at
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold">
                                                <span
                                                    className={
                                                        transaction.type ===
                                                        "expense"
                                                            ? "text-red-600"
                                                            : "text-green-600"
                                                    }
                                                >
                                                    {transaction.type ===
                                                    "expense"
                                                        ? "-"
                                                        : "+"}
                                                    $
                                                    {Number(
                                                        transaction.amount
                                                    ).toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                                                {transaction.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                                                        transaction.type ===
                                                        "expense"
                                                            ? "bg-red-100 text-red-800"
                                                            : "bg-green-100 text-green-800"
                                                    }`}
                                                >
                                                    {transaction.type ===
                                                    "expense"
                                                        ? "Expense"
                                                        : "Savings"}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
