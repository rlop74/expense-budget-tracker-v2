import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddExpenseDialog } from "./AddExpenseDialog";
import { useUserStore } from "../stores/user-store";
import { useExpenses } from "../stores/expenses-store";
import { useAppStore } from "../stores/app-store";
import { useAccountInfo } from "../hooks/getAccountInfo";
import { addExpense } from "../services/expenses-api";

// Mock all the dependencies
vi.mock("../stores/user-store");
vi.mock("../stores/expenses-store");
vi.mock("../stores/app-store");
vi.mock("../hooks/getAccountInfo");
vi.mock("../services/expenses-api");

describe("AddExpenseDialog", () => {
    let mockAddNewExpense;
    let mockSetAllTransactions;
    let mockSetIsAddExpenseBtnOpen;
    let mockAllTransactions;

    beforeEach(() => {
        // Reset all mocks before each test
        vi.clearAllMocks();

        // Setup mock functions
        mockAddNewExpense = vi.fn();
        mockSetAllTransactions = vi.fn();
        mockSetIsAddExpenseBtnOpen = vi.fn();
        mockAllTransactions = [
            { id: 1, name: "Existing Expense", amount: 100 },
        ];

        // Setup mock implementations
        useUserStore.mockImplementation((selector) =>
            selector({ user: { id: "user123" } })
        );

        useExpenses.mockImplementation((selector) =>
            selector({ addNewExpense: mockAddNewExpense })
        );

        useAppStore.mockImplementation((selector) =>
            selector({ setAllTransactions: mockSetAllTransactions })
        );

        useAccountInfo.mockReturnValue({
            allTransactions: mockAllTransactions,
        });
    });

    it("should call setAllTransactions with the new expense after an expense is successfully added", async () => {
        // Setup
        const mockExpenseData = {
            id: 2,
            name: "New Expense",
            amount: "200",
            user_id: "user123",
        };

        addExpense.mockResolvedValue(mockExpenseData);

        render(
            <AddExpenseDialog
                isAddExpenseBtnOpen={true}
                setIsAddExpenseBtnOpen={mockSetIsAddExpenseBtnOpen}
                dialogTitle="Add Expense"
                dialog="Expense"
            />
        );

        // Fill in the form
        const amountInput = screen.getByPlaceholderText("Expense amount");
        const nameInput = screen.getByPlaceholderText("Expense name");
        const confirmButton = screen.getByText("Confirm");

        fireEvent.change(amountInput, { target: { value: "200" } });
        fireEvent.change(nameInput, { target: { value: "New Expense" } });

        // Submit the form
        fireEvent.click(confirmButton);

        // Assert
        await waitFor(() => {
            expect(mockSetAllTransactions).toHaveBeenCalledWith([
                ...mockAllTransactions,
                mockExpenseData,
            ]);
        });
    });

    it("should call addNewExpense with the correct data after adding an expense", async () => {
        // Setup
        const mockExpenseData = {
            id: 3,
            name: "Test Expense",
            amount: "150",
            user_id: "user123",
        };

        addExpense.mockResolvedValue(mockExpenseData);

        render(
            <AddExpenseDialog
                isAddExpenseBtnOpen={true}
                setIsAddExpenseBtnOpen={mockSetIsAddExpenseBtnOpen}
                dialogTitle="Add Expense"
                dialog="Expense"
            />
        );

        // Fill in the form
        const amountInput = screen.getByPlaceholderText("Expense amount");
        const nameInput = screen.getByPlaceholderText("Expense name");
        const confirmButton = screen.getByText("Confirm");

        fireEvent.change(amountInput, { target: { value: "150" } });
        fireEvent.change(nameInput, { target: { value: "Test Expense" } });

        // Submit the form
        fireEvent.click(confirmButton);

        // Assert
        await waitFor(() => {
            expect(mockAddNewExpense).toHaveBeenCalledWith(mockExpenseData);
        });
    });

    it("should not call setAllTransactions or addNewExpense when validation fails", async () => {
        render(
            <AddExpenseDialog
                isAddExpenseBtnOpen={true}
                setIsAddExpenseBtnOpen={mockSetIsAddExpenseBtnOpen}
                dialogTitle="Add Expense"
                dialog="Expense"
            />
        );

        // Setup alert spy
        const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

        // Submit the form without filling inputs
        const confirmButton = screen.getByText("Confirm");
        fireEvent.click(confirmButton);

        // Assert
        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith(
                "Please fill in all fields"
            );
            expect(mockSetAllTransactions).not.toHaveBeenCalled();
            expect(mockAddNewExpense).not.toHaveBeenCalled();
        });

        alertSpy.mockRestore();
    });

    it("should not call setAllTransactions or addNewExpense when addExpense returns null", async () => {
        // Setup - addExpense returns null (indicating failure)
        addExpense.mockResolvedValue(null);

        render(
            <AddExpenseDialog
                isAddExpenseBtnOpen={true}
                setIsAddExpenseBtnOpen={mockSetIsAddExpenseBtnOpen}
                dialogTitle="Add Expense"
                dialog="Expense"
            />
        );

        // Fill in the form
        const amountInput = screen.getByPlaceholderText("Expense amount");
        const nameInput = screen.getByPlaceholderText("Expense name");
        const confirmButton = screen.getByText("Confirm");

        fireEvent.change(amountInput, { target: { value: "200" } });
        fireEvent.change(nameInput, { target: { value: "New Expense" } });

        // Submit the form
        fireEvent.click(confirmButton);

        // Assert
        await waitFor(() => {
            expect(addExpense).toHaveBeenCalled();
            expect(mockAddNewExpense).not.toHaveBeenCalled();
            expect(mockSetAllTransactions).not.toHaveBeenCalled();
        });
    });
});
