import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput";

function RecentExpenses({ expenses }) {
  return <ExpensesOutput expenses={expenses} period="Last 7 days" />;
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default connect((state) => ({
  expenses: state.expenses.expenses.filter(({ date }) => {
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const expenseDate = new Date(date).getTime();
    const now = new Date().getTime();

    return expenseDate > now - sevenDaysInMs;
  }),
}))(RecentExpenses);
