import { create } from "zustand";

export const useGoals = create((set) => ({
    totalGoalsAmount: 0,
    allGoals: [],
    setTotalGoalsAmount: (allGoalsArr) =>
        set((state) => ({
            totalGoalsAmount: allGoalsArr.reduce(
                (acc, goal) => acc + Number(goal.amount),
                0
            ),
        })),
    setAllGoals: (allGoalsArr) =>
        set((state) => ({
            allGoals: allGoalsArr,
        })),
    addNewGoal: (newGoal) =>
        set((state) => ({
            allGoals: [...state.allGoals, newGoal],
            totalGoalsAmount: state.totalGoalsAmount + Number(newGoal.amount),
        })),
}));
