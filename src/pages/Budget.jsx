export const Budget = () => {
    const categories = [
        { name: "Food", budget: 800, spent: 620 },
        { name: "Rent", budget: 1800, spent: 1800 },
        { name: "Transport", budget: 300, spent: 250 },
        { name: "Entertainment", budget: 400, spent: 520 },
    ];

    const totalBudget = categories.reduce((sum, c) => sum + c.budget, 0);
    const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Monthly Budget</h1>

            <div className="bg-white rounded-xl shadow p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-600">Total spent this month</p>
                        <p className="text-4xl font-bold">
                            ${totalSpent.toLocaleString()}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-600">
                            of ${totalBudget.toLocaleString()} budget
                        </p>
                        <p
                            className={`text-2xl font-bold ${
                                totalSpent > totalBudget
                                    ? "text-red-600"
                                    : "text-green-600"
                            }`}
                        >
                            {((totalSpent / totalBudget) * 100).toFixed(0)}%
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {categories.map((cat) => {
                    const percentage = (cat.spent / cat.budget) * 100;
                    const isOver = percentage > 100;

                    return (
                        <div
                            key={cat.name}
                            className="bg-white rounded-xl shadow p-6"
                        >
                            <div className="flex justify-between mb-4">
                                <h3 className="text-lg font-semibold">
                                    {cat.name}
                                </h3>
                                <p
                                    className={
                                        isOver
                                            ? "text-red-600 font-bold"
                                            : "text-gray-700"
                                    }
                                >
                                    ${cat.spent} / ${cat.budget}
                                </p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-8">
                                <div
                                    className={`h-full rounded-full transition-all ${
                                        isOver ? "bg-red-500" : "bg-violet-600"
                                    }`}
                                    style={{
                                        width: `${Math.min(percentage, 100)}%`,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
