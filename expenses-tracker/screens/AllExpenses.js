import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import ExpensesOutput from "../components/ExpensesOutput";

function AllExpenses({ expenses }) {
  return <ExpensesOutput expenses={expenses} period="Total" />;
}

export default connect((state) => ({ expenses: state.expenses.expenses }))(
  AllExpenses
);
