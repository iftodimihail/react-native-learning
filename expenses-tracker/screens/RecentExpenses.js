import { useEffect } from "react";
import { connect, useSelector } from "react-redux";

import ExpensesOutput from "../components/ExpensesOutput";
import { getExpenses } from "../store/expenses";

function RecentExpenses({ getExpenses }) {
  const expenses = useSelector((state) => {
    return state.expenses.expenses;
  });

  useEffect(() => {
    getExpenses();
  }, []);

  return <ExpensesOutput expenses={expenses} period="Last 7 days" />;
}

export default connect(null, { getExpenses })(RecentExpenses);
