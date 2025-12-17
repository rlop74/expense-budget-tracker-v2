// src/pages/Analytics.jsx
import { MoneyFlowChart } from "../components/MoneyFlowChart";
import { SpendingPieChart } from "../components/SpendingPieChart";

export const Analytics = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Analytics</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Spending by Category */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-xl font-semibold mb-6">
                        Spending by Category (This Month)
                    </h2>
                    <div className="h-96">
                        <SpendingPieChart />
                    </div>
                </div>

                {/* Income vs Expenses Trend */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-xl font-semibold mb-6">
                        Income vs Expenses (Last 6 Months)
                    </h2>
                    <div className="h-96">
                        <MoneyFlowChart />
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <p className="text-gray-600 mb-2">Average Daily Spending</p>
                    <p className="text-3xl font-bold">$48.50</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <p className="text-gray-600 mb-2">Highest Spending Day</p>
                    <p className="text-3xl font-bold">Saturday</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <p className="text-gray-600 mb-2">Biggest Category</p>
                    <p className="text-3xl font-bold">Food & Dining</p>
                </div>
            </div>
        </div>
    );
};
