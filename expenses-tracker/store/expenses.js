import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllExpenses } from "../utils/http";

export const getExpenses = createAsyncThunk(
  "expenses/getExpensesStatus",
  async () => {
    const data = await getAllExpenses();
    return [...data].reverse();
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    loading: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(getExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExpenses.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.expenses = payload;
      })
      .addCase(getExpenses.rejected, (state) => {
        state.loading = false;
        state.expenses = [];
      });
  },
});

export const addExpense = expensesSlice.actions.addExpense;
export const deleteExpense = expensesSlice.actions.deleteExpense;
export const updateExpense = expensesSlice.actions.updateExpense;

export default expensesSlice.reducer;
