import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import {
  getAllExpenses,
  createExpense,
  updateExpense,
  axiosDeleteExpense,
} from "../utils/http";

export const getExpenses = createAsyncThunk(
  "expenses/getExpensesStatus",
  async () => {
    const data = await getAllExpenses();
    return [...data].reverse();
  }
);

export const addEditExpense = createAsyncThunk(
  "expenses/addExpenseStatus",
  async ({ id, ...data }, { dispatch }) => {
    try {
      id ? await updateExpense(id, data) : await createExpense(data);
    } catch (err) {
      Alert.alert("There is an error");
      return;
    }

    return dispatch(getExpenses());
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/ExpenseStatus",
  async (expenseId, { dispatch }) => {
    try {
      await axiosDeleteExpense(expenseId);
    } catch (err) {
      return;
    }

    return dispatch(getExpenses());
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // GET EXPENSES
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

    // CREATE / EDIT EXPENSE;
    builder
      .addCase(addEditExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEditExpense.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addEditExpense.rejected, (state) => {
        state.loading = false;
      });

    // DELETE EXPENSE;
    builder
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExpense.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteExpense.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default expensesSlice.reducer;
