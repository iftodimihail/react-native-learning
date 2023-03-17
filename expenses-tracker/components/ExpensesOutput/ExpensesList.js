import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpensesList({ expenses }) {
  return (
    <View>
      <FlatList
        data={expenses}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          return <ExpenseItem {...item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default ExpensesList;
