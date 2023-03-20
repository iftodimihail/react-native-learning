import { useLayoutEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { GlobalStyles } from "../constants/styles";
import { addExpense, deleteExpense } from "../store/expenses";

function ManageExpense() {
  return (
    <View style={styles.rootContainer}>
      <ExpenseForm />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});

export default connect(null, { addExpense, deleteExpense })(ManageExpense);
