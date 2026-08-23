export const mockTransactions = [
  {
    id: 1,
    dateTime: "2024-03-15 09:30:45",
    transactionId: "TXN123456789",
    type: "CREDIT",
    credit: 500.0,
    debit: null,
    balance: 2500.0,
    reference: "REF123",
    description: "Salary Credit",
  },
  {
    id: 2,
    dateTime: "2024-03-14 15:20:30",
    transactionId: "TXN123456788",
    type: "DEBIT",
    credit: null,
    debit: 150.0,
    balance: 2000.0,
    reference: "REF124",
    description: "Online Purchase",
  },
  // ... Add 18 more similar transactions with different values
].concat(
  Array.from({ length: 18 }, (_, index) => ({
    id: index + 3,
    dateTime: `2024-03-${14 - Math.floor(index / 2)} ${Math.floor(
      Math.random() * 24
    )}:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`,
    transactionId: `TXN${987654321 - index}`,
    type: index % 2 === 0 ? "CREDIT" : "DEBIT",
    credit: index % 2 === 0 ? Math.floor(Math.random() * 1000) + 100 : null,
    debit: index % 2 !== 0 ? Math.floor(Math.random() * 500) + 50 : null,
    balance: 2000 - index * 100,
    reference: `REF${125 + index}`,
    description: index % 2 === 0 ? "Payment Received" : "Purchase Transaction",
  }))
);
