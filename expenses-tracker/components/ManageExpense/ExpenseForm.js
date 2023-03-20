import { useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Button from "../UI/Button";
import Input from "../UI/Input";

import { GlobalStyles } from "../../constants/styles";
import { addExpense, deleteExpense, updateExpense } from "../../store/expenses";
import IconButton from "../UI/IconButton";
import { createExpense } from "../../utils/http";

function ExpenseForm({ expenses, addExpense, deleteExpense, updateExpense }) {
  const route = useRoute();
  const { setOptions, goBack } = useNavigation();
  const expenseId = route.params?.expenseId;

  const [inputs, setInputs] = useState({
    amount: {
      value: "",
      isValid: true,
    },
    date: {
      value: "",
      isValid: true,
    },
    description: {
      value: "",
      isValid: true,
    },
  });

  useLayoutEffect(() => {
    if (expenseId) {
      const selectedExpense = expenses.find(
        (expense) => expense.id === expenseId
      );

      setInputs({
        amount: {
          value: selectedExpense.amount.toString(),
          isValid: true,
        },
        date: { value: selectedExpense.date, isValid: true },
        description: { value: selectedExpense.description, isValid: true },
      });
    }

    setOptions({
      title: !!expenseId ? "Edit Expense" : "Add Expense",
    });
  }, [expenseId]);

  function inputHandler(name, value) {
    setInputs((prevState) => ({
      ...prevState,
      [name]: {
        value,
        isValid: true,
      },
    }));
  }

  function cancelHandler() {
    goBack();
  }

  function confirmHandler() {
    const payload = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(payload.amount) && payload.amount > 0;
    const dateIsValid = payload.date.toString() !== "Invalid Date";
    const descriptionIsValid = payload.description.trim().length > 0;

    if (!(amountIsValid && dateIsValid && descriptionIsValid)) {
      Alert.alert("Inalid input!", "Please check your input values!");

      setInputs((prevState) => ({
        amount: {
          value: prevState.amount.value,
          isValid: amountIsValid,
        },
        date: {
          value: prevState.date.value,
          isValid: dateIsValid,
        },
        description: {
          value: prevState.description.value,
          isValid: descriptionIsValid,
        },
      }));

      return;
    }

    payload.date = payload.date.toISOString().slice(0, 10);

    if (expenseId) {
      updateExpense({ expenseId, data: payload });
    } else {
      addExpense({ data: payload });
      createExpense(payload);
    }
    goBack();
  }

  function deleteExpenseHandler() {
    deleteExpense({ expenseId });
    goBack();
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputHandler.bind(null, "amount"),
            value: inputs.amount.value,
          }}
          style={{ flex: 1 }}
          invalid={!inputs.amount.isValid}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputHandler.bind(null, "date"),
            value: inputs.date.value,
          }}
          style={{ flex: 1 }}
          invalid={!inputs.date.isValid}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputHandler.bind(null, "description"),
          value: inputs.description.value,
        }}
        invalid={!inputs.description.isValid}
      />
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
  formContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
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

export default connect((state) => ({ expenses: state.expenses.expenses }), {
  addExpense,
  deleteExpense,
  updateExpense,
})(ExpenseForm);
