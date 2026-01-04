import { useState } from "react";
import axios from "axios";
import { useGoals } from "../stores/goals-store";

export const EditGoalDialog = ({
    goalToEdit,
    setGoalToEdit,
    setIsEditGoalOpen,
}) => {
    const { allGoals, setAllGoals } = useGoals((state) => state);

    const handleEdit = async () => {
        try {
            await axios.patch(
                `http://localhost:3000/goals/edit-goal/${goalToEdit.id}`,
                goalToEdit
            );
            const updatedGoals = allGoals.filter(
                (goal) => goal.id !== goalToEdit.id
            );
            setAllGoals([...updatedGoals, goalToEdit]);
        } catch (err) {
            console.error("Failed to edit goal: ", err);
            alert("Something went wrong");
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                onClick={() => setIsEditGoalOpen(false)} // Close when clicking outside
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden 
                   transform transition-all duration-300 ease-out 
                   scale-100 opacity-100"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Edit Goal:{" "}
                            <span className="capitalize">
                                {goalToEdit.name}
                            </span>
                        </h2>
                        <button
                            onClick={() => setIsEditGoalOpen(false)}
                            className="p-2 rounded-lg hover:!bg-gray-100 transition-colors"
                            aria-label="Close edit modal"
                        >
                            <svg
                                className="w-6 h-6 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Body - Form */}
                    <div className="p-6 space-y-6">
                        <div>
                            <label
                                htmlFor="goal-name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Goal Name
                            </label>
                            <input
                                id="goal-name"
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                placeholder="e.g. New laptop"
                                value={goalToEdit.name}
                                onChange={(e) =>
                                    setGoalToEdit({
                                        ...goalToEdit,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="goal-amount"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Goal Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                                    $
                                </span>
                                <input
                                    id="goal-amount"
                                    type="number"
                                    step="0.01"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                                    placeholder="0.00"
                                    value={goalToEdit.target_amount}
                                    onChange={(e) =>
                                        setGoalToEdit({
                                            ...goalToEdit,
                                            target_amount: Number(
                                                e.target.value
                                            ),
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer - Actions */}
                    <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                        <button
                            onClick={() => setIsEditGoalOpen(false)}
                            className="px-6 py-3 text-gray-700 font-medium rounded-xl hover:!bg-gray-200 hover:!text-gray-700 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                handleEdit();
                                setIsEditGoalOpen(false);
                            }}
                            className="px-6 py-3 bg-violet-600 text-white font-medium rounded-xl hover:!bg-violet-700 shadow-md transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
