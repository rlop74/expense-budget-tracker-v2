// src/pages/Analytics.jsx
import { MoneyFlowChart } from "../components/MoneyFlowChart";
import { SpendingPieChart } from "../components/SpendingPieChart";
import { useExpenses } from "../stores/expenses-store";

export const Analytics = () => {
    const totalExpense = useExpenses((state) => state.totalExpense);
    const allExpenses = useExpenses((state) => state.allExpenses);
    
    // get expenses for the last 3 months
    const now = new Date();
    const threeMonthsAgo = now.setMonth(now.getMonth() - 3);
    const expThreeMonthAgo = allExpenses.filter((exp) => new Date(exp.created_at) >= threeMonthsAgo);

    const avgDailyExp = totalExpense / allExpenses.length;

    // create checker that determines the highest spending day in the past 3 months
    // const lastThreeMonths = allExpenses.filter((exp) => )

    // add all expenses per day and determine
    // biggest category should only be for a month (or 3???)

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Analytics</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Spending by Category */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-xl font-semibold mb-6">
                        Spending by Category {/* (This Month) */ }
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
                    <p className="text-3xl font-bold">${avgDailyExp.toFixed(2)}</p>
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
