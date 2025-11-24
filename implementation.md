We now have a clear roadmap from top to bottom:

1. Salary Input & Scheduled Expenses → HTML forms + localStorage.
2. Daily Expenses Logging → add/edit/delete, categorization, totals calculation.
3. Remaining Balance Calculation → salary - (totalExpenses + contributions).
4. Savings Goal Tracker → progress bar + contributions.
5. Optional Charts → pie chart / line chart for spending.
6. Async JS Currency Conversion → fetch exchange rates from an API and dynamically update all amounts.
7. Future Enhancement → email reminders for daily expenses.

We can start building it in order, focusing first on HTML forms and localStorage for salary, expenses, and contributions. Once that’s solid, we layer in the savings tracker, sorting, and then the currency conversion with async JS.