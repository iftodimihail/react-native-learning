import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [
      {
        id: "e1",
        description: "Books",
        amount: 29.99,
        date: new Date("2023-03-07").toISOString(),
      },
      {
        id: "e2",
        description: "Pair of trousers",
        amount: 19.99,
        date: new Date("2023-03-09").toISOString(),
      },
      {
        id: "e3",
        description: "Membership",
        amount: 39.59,
        date: new Date("2023-03-10").toISOString(),
      },
      {
        id: "e4",
        description: "Pair of shoes",
        amount: 59.99,
        date: new Date("2023-03-14").toISOString(),
      },
      {
        id: "e5",
        description: "T-shirt",
        amount: 10.12,
        date: new Date("2023-03-15").toISOString(),
      },
      {
        id: "e6",
        description: "Bananas",
        amount: 4.99,
        date: new Date("2023-03-16").toISOString(),
      },
    ],
  },
  reducers: {
    addExpense: (state, { payload }) => {
      state.expenses.push({
        id: new Date().toString() + Math.random().toString(),
        ...payload.data,
      });
    },
    deleteExpense: (state, { payload }) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== payload.expenseId
      );
    },
    updateExpense: (state, { payload }) => {
      const indexOfUpdatedExpense = state.expenses.findIndex(
        (expense) => expense.id === payload.expenseId
      );
      state.expenses[indexOfUpdatedExpense] = {
        ...state.expenses[indexOfUpdatedExpense],
        ...payload.data,
      };
    },
  },
});

export const addExpense = expensesSlice.actions.addExpense;
export const deleteExpense = expensesSlice.actions.deleteExpense;
export const updateExpense = expensesSlice.actions.updateExpense;

export default expensesSlice.reducer;
