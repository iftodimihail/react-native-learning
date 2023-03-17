import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import ExpensesOutput from "../components/ExpensesOutput";

function AllExpenses({ expenses }) {
  return <ExpensesOutput expenses={expenses} period="Total" />;
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default connect((state) => ({ expenses: state.expenses.expenses }))(
  AllExpenses
);
