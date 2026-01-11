import { Home, Utensils, Car, Popcorn, Wallet } from "lucide-react";

export const Budget = () => {
    const categories = [
        {
            name: "Food",
            budget: 800,
            spent: 620,
            icon: Utensils,
            color: "indigo",
        },
        {
            name: "Rent",
            budget: 1800,
            spent: 1800,
            icon: Home,
            color: "emerald",
        },
        {
            name: "Transport",
            budget: 300,
            spent: 250,
            icon: Car,
            color: "amber",
        },
        {
            name: "Entertainment",
            budget: 400,
            spent: 520,
            icon: Popcorn,
            color: "rose",
        },
    ];

    const totalBudget = categories.reduce((sum, c) => sum + c.budget, 0);
    const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);
    const totalPercentage = (totalSpent / totalBudget) * 100;
    const isOverBudget = totalSpent > totalBudget;

    // Pie chart data for category breakdown
    const pieData = categories.map((cat) => ({
        name: cat.name,
        value: cat.spent,
        percentage: (cat.spent / totalBudget) * 100,
        color:
            cat.color === "indigo"
                ? "#6366f1"
                : cat.color === "emerald"
                ? "#10b981"
                : cat.color === "amber"
                ? "#f59e0b"
                : "#f43f5e",
    }));

    let accumulated = 0;
    const slices = pieData.map((item) => {
        const startAngle = (accumulated / 100) * 360;
        accumulated += item.percentage;
        const endAngle = (accumulated / 100) * 360;
        const largeArc = item.percentage > 50 ? 1 : 0;
        const path = `M 100 100 L ${
            100 + 80 * Math.cos((startAngle * Math.PI) / 180)
        } ${
            100 + 80 * Math.sin((startAngle * Math.PI) / 180)
        } A 80 80 0 ${largeArc} 1 ${
            100 + 80 * Math.cos((endAngle * Math.PI) / 180)
        } ${100 + 80 * Math.sin((endAngle * Math.PI) / 180)} Z`;
        return { path, color: item.color };
    });

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="flex flex-col max-w-6xl mx-auto gap-15">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-extrabold">
                        Monthly Budget Overview
                    </h1>
                    <button
                        // onClick=
                        className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700">
                        + New Budget
                    </button>
                </div>

                {/* Hero Summary Card - Glassmorphic */}
                <div className="border border-gray-200 rounded-3xl shadow-2xl p-10">
                    <div className="grid lg:grid-cols-3 gap-12 items-center">
                        {/* Pie Chart Breakdown */}
                        <div className="flex justify-center">
                            <div className="relative w-80 h-80">
                                <svg
                                    viewBox="0 0 200 200"
                                    className="w-full h-full"
                                >
                                    {/* Background */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="80"
                                        fill="#f1f5f9"
                                        className="dark:fill-slate-800"
                                    />
                                    {/* Slices */}
                                    {slices.map((slice, i) => (
                                        <path
                                            key={i}
                                            d={slice.path}
                                            fill={slice.color}
                                            opacity="0.9"
                                        />
                                    ))}
                                    {/* Center Cutout for Donut */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="50"
                                        fill="#fff"
                                        className=""
                                    />
                                </svg>

                                {/* Center Stats */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <Wallet className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
                                    <p className="text-5xl font-bold">
                                        {totalPercentage.toFixed(0)}%
                                    </p>
                                    <p className="text-lg">spent</p>
                                </div>
                            </div>
                        </div>

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

                            <div
                                className={`text-center py-4 px-8 rounded-2xl ${
                                    isOverBudget
                                        ? "bg-red-100/80 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                                        : "bg-green-300 text-green-700"
                                }`}
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
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => {
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
                                        <div
                                            className={`p-3 rounded-xl bg-${cat.color}-100 dark:bg-${cat.color}-900/50`}
                                        >
                                            <Icon
                                                className={`w-6 h-6 text-${cat.color}-600 dark:text-${cat.color}-400`}
                                            />
                                        </div>
                                        <h3 className="text-xl font-semibold">
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
                                            ${cat.spent.toLocaleString()} spent
                                        </span>
                                        <span className="text-slate-500 dark:text-slate-500">
                                            ${cat.budget.toLocaleString()}{" "}
                                            budget
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r from-${cat.color}-500 to-${cat.color}-600`}
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
                                                : "text-green-600 dark:text-green-400"
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
