import { useLayoutEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { addExpense, deleteExpense } from "../store/expenses";

function ManageExpense({ route, navigation, addExpense, deleteExpense }) {
  const expenseId = route.params?.expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !!expenseId ? "Edit Expense" : "Add Expense",
    });
  }, [expenseId, navigation]);

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    navigation.goBack();
  }

  function deleteExpenseHandler() {
    deleteExpense({ expenseId });
    navigation.goBack();
  }

  return (
    <View style={styles.rootContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {expenseId ? "Update" : "Add"}
        </Button>
      </View>
      {expenseId && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default connect(null, { addExpense, deleteExpense })(ManageExpense);
