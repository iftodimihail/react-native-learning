import { useEffect } from "react";
import { connect, useSelector } from "react-redux";

import ExpensesOutput from "../components/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { getExpenses } from "../store/expenses";

function RecentExpenses({ getExpenses, expenses, isFetching }) {
  useEffect(() => {
    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return <ExpensesOutput expenses={expenses} period="Last 7 days" />;
}

export default connect(
  (state) => ({
    expenses: state.expenses.expenses,
    isFetching: state.expenses.loading,
  }),
  { getExpenses }
)(RecentExpenses);
