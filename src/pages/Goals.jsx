import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog } from "../components/Dialog";
import { useGoals } from "../stores/goals-store";
import { useAppStore } from "../stores/app-store";
import axios from "axios";

export const Goals = () => {
    // modal states
    const [isNewGoalOpen, setIsNewGoalOpen] = useState(false);
    const [isEditGoalOpen, setIsEditGoalOpen] = useState(false);
    const [isAddAmountOpen, setIsAddAmountOpen] = useState(false);

    // store functions and variables
    const allGoals = useGoals((state) => state.allGoals);
    const setAllGoals = useGoals((state) => state.setAllGoals);
    const addNewGoal = useGoals((state) => state.addNewGoal);
    const loading = useAppStore((state) => state.loading);

    // empty states for adding and editing
    const [newGoal, setNewGoal] = useState({});
    const [goalToEdit, setGoalToEdit] = useState({
        id: null,
        name: "",
        target_amount: "",
    });
    const [goalToIncrease, setGoalToIncrease] = useState({
        id: null,
    });
    const [addGoalAmount, setAddGoalAmount] = useState("");

    // handle functions
    const handleAddGoal = async () => {
        try {
            const { data } = await axios.post(
                `http://localhost:3000/goals/add-goal`,
                newGoal
            );

            // update store/UI
            addNewGoal(data);

            // clear state and close modal
            setNewGoal({});
            setIsNewGoalOpen(false);
        } catch (err) {
            console.error("Failed to add goal: ", err);
            alert("Something went wrong");
        }
    };

    const handleEdit = async () => {
        try {
            await axios.patch(
                `http://localhost:3000/goals/edit-goal/${goalToEdit.id}`,
                goalToEdit
            );
            const updatedGoals = allGoals.filter(
                (goal) => goal.id !== goalToEdit.id
            );

            // update store/UI and close modal
            setAllGoals([...updatedGoals, goalToEdit]);
            setIsEditGoalOpen(false);
        } catch (err) {
            console.error("Failed to edit goal: ", err);
            alert("Something went wrong");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/goals/delete-goal/${id}`);
            const updatedGoals = allGoals.filter((goal) => goal.id !== id);
            setAllGoals(updatedGoals);
        } catch (err) {
            console.log("Failed to delete goal: ", err);
            alert("Something went wrong");
        }
    };

    const handleAddGoalAmount = async () => {
        try {
            await axios.patch(
                `http://localhost:3000/goals/edit-goal/${goalToIncrease.id}`,
                {
                    ...goalToIncrease,
                    current_amount:
                        goalToIncrease.current_amount + Number(addGoalAmount),
                }
            );

            // update UI/store
            const updatedGoals = allGoals.filter(
                (goal) => goal.id !== goalToIncrease.id
            );
            setAllGoals([
                ...updatedGoals,
                {
                    ...goalToIncrease,
                    current_amount:
                        goalToIncrease.current_amount + Number(addGoalAmount),
                },
            ]);

            // clear input fields and close modal
            setAddGoalAmount("")
            setIsAddAmountOpen(false);
        } catch (err) {
            console.error("Failed to edit goal: ", err);
            alert("Something went wrong");
        }
    };

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
                <Dialog
                    title="Add New Goal"
                    setIsOpen={setIsNewGoalOpen}
                    handleFunction={handleAddGoal}
                >
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
                                value={newGoal.name}
                                onChange={(e) =>
                                    setNewGoal({
                                        ...newGoal,
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
                                    value={newGoal.target_amount}
                                    onChange={(e) =>
                                        setNewGoal({
                                            ...newGoal,
                                            target_amount: Number(
                                                e.target.value
                                            ),
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Dialog>
            )}

            {isEditGoalOpen && (
                <Dialog
                    title={`Edit Goal: ${goalToEdit.name}`}
                    setIsOpen={setIsEditGoalOpen}
                    handleFunction={handleEdit}
                >
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
                </Dialog>
            )}

            {isAddAmountOpen && (
                <Dialog
                    title={`Add to Goal: ${goalToIncrease.name}`}
                    setIsOpen={setIsAddAmountOpen}
                    handleFunction={handleAddGoalAmount}
                >
                    <div className="p-6 space-y-6">
                        <div>
                            <label
                                htmlFor="goal-amount"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Amount to add
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
                                    value={addGoalAmount}
                                    onChange={(e) =>
                                        setAddGoalAmount(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Dialog>
            )}

            {loading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-violet-500"></div>
                        </div>
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                            Loading...
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Please wait while we prepare everything
                        </p>
                    </div>
                </div>
            ) : allGoals.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-2xl mb-4">No goals yet</p>
                    <p>Create your first saving goal to get started!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allGoals
                        .sort((a, b) => a.id - b.id)
                        .map((goal) => {
                            const percentage =
                                (Number(goal.current_amount) /
                                    Number(goal.target_amount)) *
                                100;

                            return (
                                <div
                                    key={goal.id}
                                    className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
                                >
                                    <div className="flex justify-between">
                                        <h3 className="text-xl font-bold mb-4 capitalize">
                                            {goal.name}
                                        </h3>

                                        <div className="flex gap-3">
                                            <Pencil
                                                size={20}
                                                className="text-gray-600 hover:text-violet-500 cursor-pointer"
                                                onClick={() => {
                                                    setIsEditGoalOpen(true);
                                                    setGoalToEdit({
                                                        id: goal.id,
                                                        name: goal.name,
                                                        target_amount:
                                                            goal.target_amount,
                                                        current_amount:
                                                            goal.current_amount,
                                                    });
                                                }}
                                            />
                                            <Trash2
                                                size={20}
                                                className="text-gray-600 hover:text-red-500 cursor-pointer"
                                                onClick={() => {
                                                    handleDelete(goal.id);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                                            <span>
                                                $
                                                {goal.current_amount.toLocaleString()}
                                            </span>
                                            <span>
                                                $
                                                {goal.target_amount.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 transition-all duration-1000`}
                                                // bg-gradient-to-r from-${goal.color}-500 to-${goal.color}-600
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            />
                                        </div>
                                        <p className="text-right mt-2 text-sm font-medium text-gray-700">
                                            {percentage.toFixed(0)}% complete
                                        </p>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            className="text-violet-600 font-medium hover:!bg-white hover:!text-violet-800"
                                            onClick={() => {
                                                setGoalToIncrease({
                                                    ...goalToIncrease,
                                                    id: goal.id,
                                                    name: goal.name,
                                                    target_amount: Number(
                                                        goal.target_amount
                                                    ),
                                                    current_amount: Number(
                                                        goal.current_amount
                                                    ),
                                                });
                                                setIsAddAmountOpen(true);
                                            }}
                                        >
                                            Add money →
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};
