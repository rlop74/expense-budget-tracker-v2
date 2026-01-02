import { useGoals } from "../stores/goals-store";

export const SavingGoals = () => {
    const allGoals = useGoals((state) => state.allGoals);

    return (
        <div className="space-y-8 p-6">
            {allGoals.map((goal) => {
                const percentage =
                    (goal.current_amount / goal.target_amount) * 100;

                return (
                    <div key={goal.name} className="space-y-2 capitalize">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-700">
                                {goal.name}
                            </span>
                            <span className="text-gray-600">
                                ${goal.current_amount.toLocaleString()} / $
                                {goal.target_amount.toLocaleString()}
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex gap-1 w-full bg-gray-400 rounded-full h-5 overflow-hidden relative">
                            <div
                                className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${percentage}%` }}
                            />
                            {/* Percentage */}
                            <div className="text-center text-sm font-medium text-white inset-0 absolute">
                                {percentage.toFixed(0)}%
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
