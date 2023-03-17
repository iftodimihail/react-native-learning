import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses";

export default store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});
