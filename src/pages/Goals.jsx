import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { NewSavingGoal } from "../components/NewSavingGoal";

const mockGoals = [
    {
        id: 1,
        name: "Emergency Fund",
        target: 10000,
        current: 6500,
        color: "violet",
    },
    { id: 2, name: "Vacation", target: 5000, current: 1200, color: "violet" },
    { id: 3, name: "New Laptop", target: 2000, current: 800, color: "violet" },
];

export const Goals = () => {
    const [goals] = useState(mockGoals);
    const [isNewGoalOpen, setIsNewGoalOpen] = useState(false);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Saving Goals</h1>
                <button
                    onClick={() => setIsNewGoalOpen(true)}
                    className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700"
                >
                    + New Goal
                </button>
            </div>

            {isNewGoalOpen && (
                <NewSavingGoal setIsNewGoalOpen={setIsNewGoalOpen} />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {goals.map((goal) => {
                    const percentage = (goal.current / goal.target) * 100;

                    return (
                        <div
                            key={goal.id}
                            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
                        >
                            <div className="flex justify-between">
                                <h3 className="text-xl font-bold mb-4">
                                    {goal.name}
                                </h3>
                                <div className="flex gap-3">
                                    <Pencil
                                        size={20}
                                        className="text-gray-600 hover:text-violet-500 cursor-pointer"
                                    />
                                    <Trash2
                                        size={20}
                                        className="text-gray-600 hover:text-red-500 cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>
                                        ${goal.current.toLocaleString()}
                                    </span>
                                    <span>${goal.target.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full bg-${goal.color}-500 transition-all duration-1000`}
                                        // bg-gradient-to-r from-${goal.color}-500 to-${goal.color}-600
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <p className="text-right mt-2 text-sm font-medium text-gray-700">
                                    {percentage.toFixed(0)}% complete
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <button className="text-violet-600 font-medium hover:!bg-white hover:!text-violet-800">
                                    Add money →
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {goals.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-2xl mb-4">No goals yet</p>
                    <p>Create your first saving goal to get started!</p>
                </div>
            )}
        </div>
    );
};
