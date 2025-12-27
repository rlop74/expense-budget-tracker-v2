import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from "recharts";
import { useAccountInfo } from "../hooks/getAccountInfo";
// const mockData = [
//     { name: "Transport & Automotive", value: 1200 },
//     { name: "Monthly Bills & Utilities", value: 800 },
//     { name: "Education", value: 800 },
//     { name: "Entertainment & Shopping", value: 800 },
//     { name: "Food & Groceries", value: 800 },
//     { name: "Health & Wellness", value: 800 },
//     { name: "Other", value: 400 },
// ];
// ["Transport & Automotive", "Monthly Bills & Utilities", "Education", "Entertainment & Shopping", "Food & Groceries", "Health & Wellness", "Other"]
// ["Automotive", "Bills & Utilities", "Education", "Entertainment", "Food & Drinks", "Gas", "Groceries", "Health & Wellness", "Home", "Rent", "Shopping", "Transport", "Other"]

const COLORS = [
    "#8b5cf6",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#ec4899",
    "#a78bfa",
    "#84cc16",
    "#f97316",
];
export const SpendingPieChart = () => {
    const { allTransactions } = useAccountInfo();
    const data = Object.values(
        allTransactions.reduce((acc, transaction) => {
            // check if transaction type is expenses, savings don't have categories
            if (transaction.type === "saving") return acc;

            let category = transaction.category || "Other";

            // check if category exists already
            if (!acc[category]) {
                acc[category] = {
                    name: category,
                    value: 0,
                };
            }

            // add amount
            acc[category].value += transaction.amount;

            return acc;
        }, {})
    );

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};
