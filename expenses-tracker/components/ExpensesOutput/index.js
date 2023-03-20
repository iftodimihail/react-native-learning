import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";
import { connect } from "react-redux";

function ExpensesOutput({ expenses, period }) {
  return (
    <View style={styles.rootContainer}>
      <ExpensesSummary expenses={expenses} period={period} />
      {expenses.length > 0 ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <View style={styles.fallbackTextContainer}>
          <Text style={styles.noExpensesText}>
            There are no expenses at the moment!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  fallbackTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  noExpensesText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default ExpensesOutput;
