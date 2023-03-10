import { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [goals, setGoals] = useState([]);

  function addGoalHandler(goalText) {
    setGoals((prevState) => [
      ...prevState,
      { text: goalText, id: Math.random().toString() },
    ]);
    setVisibleModal(false);
  }

  function startAddGoalHandler() {
    setVisibleModal(true);
  }

  function endAddGoalHandler() {
    setVisibleModal(false);
  }

  function deleteGoalHandler(goalId) {
    const newGoals = [...goals].filter((goal) => goal.id !== goalId);
    setGoals(newGoals);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#1e90ff"
          onPress={startAddGoalHandler}
        />
        {visibleModal && (
          <GoalInput
            onAddGoal={addGoalHandler}
            visible={visibleModal}
            onCancel={endAddGoalHandler}
          />
        )}
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
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
  goalsContainer: {
    flex: 5,
  },
});
