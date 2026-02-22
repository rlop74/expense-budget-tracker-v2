import { Home, Utensils, Car, Popcorn, Wallet } from "lucide-react";
import { useBudget } from "../stores/budget-store";
import { useExpenses } from "../stores/expenses-store";

export const Budget = () => {
    const allBudgets = useBudget((state) => state.allBudgets);
    const allExpenses = useExpenses((state) => state.allExpenses);

    // create monthly expenses, filter expenses for this month
    const thisMonthExpenses = allExpenses.filter((exp) => {
        const today = new Date();
        const year = today.getFullYear();
        const expDate = new Date(exp.created_at);

        if (expDate.getFullYear() == year) {
            return expDate.getMonth() === today.getMonth();
        }
    });

    // filter by categories and add thisMonthExpenses.amount to allBudget.spent

    // create an Object that loops through thisMonthExpenses and create an object that has the category as the key and amount as the value
    const categorizedMonthlyExp = {};
    thisMonthExpenses.map((exp) => {
        // check if exp category is not in thisMonthExpensesObj and set a key/value pair if it isn't
        if (!(exp.category in categorizedMonthlyExp)) {
            categorizedMonthlyExp[exp.category] = 0;
        }
        categorizedMonthlyExp[exp.category] += exp.amount;
    });

    // add categorizedMonthlyExp's amount to respective allBudget.category amounts
    allBudgets.map((budget) => {
        if (budget.name in categorizedMonthlyExp) {
            budget.spent = categorizedMonthlyExp[budget.name];
        }
    });

    const totalBudget = allBudgets.reduce((sum, c) => sum + c.budget, 0);
    const totalSpent = allBudgets.reduce((sum, c) => sum + c.spent, 0);
    const totalPercentage = 100 - (totalSpent / totalBudget) * 100;
    const color =
        totalPercentage >= 60
            ? "bg-green-300 text-green-700"
            : totalPercentage >= 40
            ? "bg-orange-300 text-orange-700"
            : "bg-red-100/80 text-red-700";
    const isOverBudget = totalSpent > totalBudget;

    return (
        <div className="flex flex-col gap-12 min-h-screen py-12 px-12">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-extrabold">
                    Monthly Budget Overview
                </h1>
            </div>

            {/* Budget Summary */}
            <div className="flex flex-col gap-15">
                {/* Hero Summary Card - Glassmorphic */}
                <div className="border border-gray-200 rounded-3xl shadow-2xl p-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Key Metrics */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="shadow-lg rounded-2xl p-6 text-center border border-gray-200 hover:scale-105 transition-transform duration-300">
                                    <p className="">Total Spent</p>
                                    <p className="text-4xl font-bold mt-2">
                                        ${totalSpent.toLocaleString()}
                                    </p>
                                </div>
                                <div className="shadow-lg rounded-2xl p-6 text-center border border-gray-200 hover:scale-105 transition-transform duration-300">
                                    <p className="">Monthly Budget</p>
                                    <p className="text-4xl font-bold mt-2">
                                        ${totalBudget.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                    {/* Remaining Budget bar */}
                    {/* setup remaining budget to a progress bar depending on the total percentage */}
                            <div
                                className={`text-center py-4 px-8 rounded-2xl ${color}`}
                            >
                                <p className="text-2xl font-semibold">
                                    {isOverBudget
                                        ? `$${Math.abs(
                                              totalBudget - totalSpent
                                          ).toLocaleString()} over budget`
                                        : `$${(
                                              totalBudget - totalSpent
                                          ).toLocaleString()} remaining`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories List */}
                {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"> */}
                <div className="grid grid-cols-2 gap-6">
                    {allBudgets
                        .sort((a, b) => a.id - b.id)
                        .map((cat) => {
                            const percentage = (cat.spent / cat.budget) * 100;
                            const isOver = percentage > 100;
                            const Icon = cat.icon;

                            return (
                                <div
                                    key={cat.name}
                                    className="rounded-2xl shadow-lg p-6 border border-gray-200 hover:scale-105 transition-transform duration-300"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            {/* <div
                                            className={`p-3 rounded-xl bg-${cat.color}-100 dark:bg-${cat.color}-900/50`}
                                        >
                                            <Icon
                                                className={`w-6 h-6 text-${cat.color}-600 dark:text-${cat.color}-400`}
                                            />
                                        </div> */}
                                            <h3 className="text-lg font-semibold">
                                                {cat.name}
                                            </h3>
                                        </div>
                                        <span
                                            className={`text-lg font-bold ${
                                                isOver ? "text-red-600" : ""
                                            }`}
                                        >
                                            {percentage.toFixed(0)}%
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600 dark:text-slate-400">
                                                $
                                                {Number(
                                                    cat.spent
                                                ).toLocaleString()}{" "}
                                                spent
                                            </span>
                                            <span className="text-slate-500 dark:text-slate-500">
                                                $
                                                {Number(
                                                    cat.budget
                                                ).toLocaleString()}{" "}
                                                budget
                                            </span>
                                        </div>

                                        {/* progress bar */}
                                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-700 ${
                                                    isOverBudget
                                                        ? "bg-gradient-to-r from-red-500 to-red-800"
                                                        : "bg-gradient-to-r from-violet-500 to-violet-800"
                                                }`}
                                                style={{
                                                    width: `${Math.min(
                                                        percentage,
                                                        100
                                                    )}%`,
                                                }}
                                            />
                                        </div>
                                        <p
                                            className={`text-right text-sm font-medium ${
                                                isOver
                                                    ? "text-red-600"
                                                    : "text-green-600"
                                            }`}
                                        >
                                            {isOver
                                                ? `${Math.abs(
                                                      cat.budget - cat.spent
                                                  ).toLocaleString()} over`
                                                : `${(
                                                      cat.budget - cat.spent
                                                  ).toLocaleString()} left`}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
