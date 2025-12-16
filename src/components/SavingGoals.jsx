const goals = [
  { name: "Emergency Fund", current: 3000, target: 10000 },
  { name: "Vacation", current: 1200, target: 3000 },
  { name: "New Laptop", current: 800, target: 2000 },
];

export const SavingGoals = () => {
  return (
    <div className="space-y-8 p-6">
      {goals.map((goal) => {
        const percentage = (goal.current / goal.target) * 100;

        return (
          <div key={goal.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">{goal.name}</span>
              <span className="text-gray-600">
                ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Percentage */}
            <div className="text-right text-sm text-gray-600 font-medium">
              {percentage.toFixed(0)}%
            </div>
          </div>
        );
      })}
    </div>
  );
};