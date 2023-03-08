import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [goals, setGoals] = useState([]);

  function addGoalHandler(goalText) {
    setGoals((prevState) => [
      ...prevState,
      { text: goalText, id: Math.random().toString() },
    ]);
  }

  function deleteGoalHandler(goalId) {
    const newGoals = [...goals].filter((goal) => goal.id !== goalId);
    setGoals(newGoals);
  }

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
      <View style={styles.goalsContainer}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={goals}
          renderItem={({ item }) => {
            return <GoalItem item={item} onDeleteGoal={deleteGoalHandler} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#60a8cc",
  },
  goalsContainer: {
    flex: 5,
  },
});
