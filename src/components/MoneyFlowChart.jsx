import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { useAppStore } from "../stores/app-store";
import { groupTransactionsByMonth } from "../services/group-transactions";

export const MoneyFlowChart = () => {
    const allTransactions = useAppStore((state) => state.allTransactions);
    const MONTH_ORDER = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // Convert to array for chart
    const monthlyData = Object.values(
        groupTransactionsByMonth(allTransactions)
    );

    // get date six months ago
    const now = new Date();
    const sixMonthsAgo = now.setMonth(now.getMonth() - 5);

    // sort by date
    const pastSixMonths = monthlyData
        .sort((a, b) => {
            // first compare year
            if (a.year !== b.year) {
                return a.year - b.year;
            }
            return MONTH_ORDER.indexOf(a.month) - MONTH_ORDER.indexOf(b.month);
        })
        .filter((data) => new Date(data.created_at) >= sixMonthsAgo);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pastSixMonths}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                />
                <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={3}
                />
                <Line
                    type="monotone"
                    dataKey="savings"
                    stroke="#058900ff"
                    strokeWidth={3}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};
