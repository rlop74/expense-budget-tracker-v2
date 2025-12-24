export const groupTransactionsByMonth = (transactions) => {
    // loop through every transaction via reduce
    return transactions.reduce((acc, transaction) => {
        // get the date object
        const dateObj = new Date(transaction.created_at);

        // create the values
        const month = dateObj.toLocaleString("default", { month: "short" }); // "Aug"
        const year = dateObj.getFullYear(); // 2025
        const date = `${month} ${year}`; // "Aug 2025"

        // initialize if it doesn't exist
        // "Aug 2025" doesn't exist, create it
        // acc = {
        //   "Aug 2025": { date: "Aug 2025", month: "Aug", year: 2025, expenses: 0, savings: 0 }
        // }
        if (!acc[date]) {
            acc[date] = {
                date: date,
                month: month,
                year: year,
                expenses: 0,
                savings: 0,
                created_at: transaction.created_at,
            };
        }

        // Add to correct type
        // Type "saving" → add 800
        // acc["Aug 2025"].savings = 800
        if (transaction.type === "saving") {
            acc[date].savings += Number(transaction.amount || 0);
        } else {
            acc[date].expenses += Number(transaction.amount || 0);
        }

        return acc;
    }, {}); // empty object to start with
};


// --------------------------------------------------------------------

// const groupTransactionsByMonth = (transactions) => {
//   const grouped = {};

//   transactions.forEach((transaction) => {
//     const date = new Date(transaction.created_at);
//     const month = date.toLocaleString("default", { month: "short" });
//     const year = date.getFullYear();
//     const monthKey = `${month} ${year}`;

//     if (!grouped[monthKey]) {
//       grouped[monthKey] = { month: monthKey, expenses: 0, savings: 0 };
//     }

//     if (transaction.type === "saving") {
//       grouped[monthKey].savings += Number(transaction.amount || 0);
//     } else {
//       grouped[monthKey].expenses += Number(transaction.amount || 0);
//     }
//   });

//   // Convert to array and sort by year THEN month order
//   return Object.values(grouped).sort((a, b) => {
//     const [monthA, yearA] = a.month.split(" ");
//     const [monthB, yearB] = b.month.split(" ");

//     // First compare year
//     if (yearA !== yearB) {
//       return yearA - yearB;
//     }

//     // Then compare month order
//     return MONTH_ORDER.indexOf(monthA) - MONTH_ORDER.indexOf(monthB);
//   });
// };
