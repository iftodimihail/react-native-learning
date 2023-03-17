import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({ expenses = [], period }) {
  const expensesSum = useMemo(
    () =>
      expenses.reduce((sum, currentExpense) => sum + currentExpense.amount, 0),
    [expenses]
  );

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.period}>{period}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});

export default ExpensesSummary;
