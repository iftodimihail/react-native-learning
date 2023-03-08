import { StyleSheet, Text, View, Pressable } from "react-native";

function GoalItem({ item, onDeleteGoal }) {
  function deleteGoalHandler() {
    onDeleteGoal(item.id);
  }

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressedItem}
      onPress={deleteGoalHandler}
    >
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{item.text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#1e90ff",
  },
  goalText: {
    color: "white",
    padding: 8,
  },
  pressedItem: {
    opacity: 0.7,
  },
});

export default GoalItem;
