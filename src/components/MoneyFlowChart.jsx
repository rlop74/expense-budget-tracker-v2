import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export const MoneyFlowChart = () => {
    const data = [
        { month: "Jan", income: 5000, expenses: 3200 },
        { month: "Feb", income: 5200, expenses: 2800 },
        { month: "Mar", income: 5000, expenses: 3500 },
        { month: "Apr", income: 5500, expenses: 3000 },
        { month: "May", income: 5200, expenses: 3300 },
        { month: "Jun", income: 5800, expenses: 3600 },
    ];
    
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
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
            </LineChart>
        </ResponsiveContainer>
    );
};
