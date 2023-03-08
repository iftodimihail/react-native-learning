import { useState } from "react";
import { StyleSheet, Button, View, TextInput, Image } from "react-native";

function GoalInput({ onAddGoal }) {
  const [goalText, setGoalText] = useState("");

  function goalInputHandler(text) {
    setGoalText(text);
  }

  function addGoalHandler() {
    onAddGoal(goalText);
    setGoalText("");
  }

  return (
    <View style={styles.inputContainer}>
      <Image
        style={styles.image}
        source={require("../assets/images/goal.png")}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Your course goal!"
        onChangeText={goalInputHandler}
        value={goalText}
      />
      <Button title="Add Goal" onPress={addGoalHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    width: "50%",
    marginRight: 8,
    padding: 8,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
});

export default GoalInput;
