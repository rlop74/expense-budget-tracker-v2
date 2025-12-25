import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddSavingsDialog } from "./AddSavingsDialog";
import { useUserStore } from "../stores/user-store";
import { useSavings } from "../stores/savings-store";
import { useAppStore } from "../stores/app-store";
import { useAccountInfo } from "../hooks/getAccountInfo";
import { addSavings } from "../services/savings-api";

// Mock all the dependencies
vi.mock("../stores/user-store");
vi.mock("../stores/savings-store");
vi.mock("../stores/app-store");
vi.mock("../hooks/getAccountInfo");
vi.mock("../services/savings-api");

describe("AddSavingsDialog", () => {
    let mockAddTotalSavings;
    let mockSetAllTransactions;
    let mockSetIsAddSavingsBtnOpen;
    let mockAllTransactions;

    beforeEach(() => {
        // Reset all mocks before each test
        vi.clearAllMocks();

        // Setup mock functions
        mockAddTotalSavings = vi.fn();
        mockSetAllTransactions = vi.fn();
        mockSetIsAddSavingsBtnOpen = vi.fn();
        mockAllTransactions = [
            { id: 1, name: "Existing Transaction", amount: 100 },
        ];

        // Setup mock implementations
        useUserStore.mockImplementation((selector) =>
            selector({ user: { id: "user123" } })
        );

        useSavings.mockImplementation((selector) =>
            selector({ addTotalSavings: mockAddTotalSavings })
        );

        useAppStore.mockImplementation((selector) =>
            selector({ setAllTransactions: mockSetAllTransactions })
        );

        useAccountInfo.mockReturnValue({
            allTransactions: mockAllTransactions,
        });
    });

    it("should call setAllTransactions with the new saving after a saving is successfully added", async () => {
        // Setup
        const mockSavingsData = {
            id: 2,
            amount: "500",
            user_id: "user123",
        };

        addSavings.mockResolvedValue(mockSavingsData);

        render(
            <AddSavingsDialog
                isAddSavingsBtnOpen={true}
                setIsAddSavingsBtnOpen={mockSetIsAddSavingsBtnOpen}
                dialogTitle="Add Savings"
                dialog="Savings"
            />
        );

        // Fill in the form
        const amountInput = screen.getByPlaceholderText("Savings amount");
        const confirmButton = screen.getByText("Confirm");

        fireEvent.change(amountInput, { target: { value: "500" } });

        // Submit the form
        fireEvent.click(confirmButton);

        // Assert
        await waitFor(() => {
            expect(mockSetAllTransactions).toHaveBeenCalledWith([
                ...mockAllTransactions,
                mockSavingsData,
            ]);
        });
    });

    it("should call addTotalSavings with the correct data after adding a saving", async () => {
        // Setup
        const mockSavingsData = {
            id: 3,
            amount: "750",
            user_id: "user123",
        };

        addSavings.mockResolvedValue(mockSavingsData);

        render(
            <AddSavingsDialog
                isAddSavingsBtnOpen={true}
                setIsAddSavingsBtnOpen={mockSetIsAddSavingsBtnOpen}
                dialogTitle="Add Savings"
                dialog="Savings"
            />
        );

        // Fill in the form
        const amountInput = screen.getByPlaceholderText("Savings amount");
        const confirmButton = screen.getByText("Confirm");

        fireEvent.change(amountInput, { target: { value: "750" } });

        // Submit the form
        fireEvent.click(confirmButton);

        // Assert
        await waitFor(() => {
            expect(mockAddTotalSavings).toHaveBeenCalledWith(mockSavingsData);
        });
    });

    it("should call both setAllTransactions and addTotalSavings when saving is added", async () => {
        // Setup
        const mockSavingsData = {
            id: 4,
            amount: "1000",
            user_id: "user123",
        };

        addSavings.mockResolvedValue(mockSavingsData);

        render(
            <AddSavingsDialog
                isAddSavingsBtnOpen={true}
                setIsAddSavingsBtnOpen={mockSetIsAddSavingsBtnOpen}
                dialogTitle="Add Savings"
                dialog="Savings"
            />
        );

        // Fill in the form
        const amountInput = screen.getByPlaceholderText("Savings amount");
        const confirmButton = screen.getByText("Confirm");

        fireEvent.change(amountInput, { target: { value: "1000" } });

        // Submit the form
        fireEvent.click(confirmButton);

        // Assert
        await waitFor(() => {
            expect(mockAddTotalSavings).toHaveBeenCalledWith(mockSavingsData);
            expect(mockSetAllTransactions).toHaveBeenCalledWith([
                ...mockAllTransactions,
                mockSavingsData,
            ]);
        });
    });

    it("should close the dialog after successfully adding savings", async () => {
        // Setup
        const mockSavingsData = {
            id: 5,
            amount: "250",
            user_id: "user123",
        };

        addSavings.mockResolvedValue(mockSavingsData);

        render(
            <AddSavingsDialog
                isAddSavingsBtnOpen={true}
                setIsAddSavingsBtnOpen={mockSetIsAddSavingsBtnOpen}
                dialogTitle="Add Savings"
                dialog="Savings"
            />
        );

        // Fill in the form
        const amountInput = screen.getByPlaceholderText("Savings amount");
        const confirmButton = screen.getByText("Confirm");

        fireEvent.change(amountInput, { target: { value: "250" } });

        // Submit the form
        fireEvent.click(confirmButton);

        // Assert
        await waitFor(() => {
            expect(mockSetIsAddSavingsBtnOpen).toHaveBeenCalledWith(false);
        });
    });
});
