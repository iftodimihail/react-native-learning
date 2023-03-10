import { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  TextInput,
  Image,
  Modal,
} from "react-native";

function GoalInput({ onAddGoal, visible, onCancel }) {
  const [goalText, setGoalText] = useState("");

  function goalInputHandler(text) {
    setGoalText(text);
  }

  function addGoalHandler() {
    onAddGoal(goalText);
    setGoalText("");
  }

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent={true}>
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
          placeholderTextColor="white"
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={onCancel} color="#bfbfbf" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#0855c2",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e2e2e2",
    width: "100%",
    padding: 12,
    borderRadius: 6,
    color: "white",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});

export default GoalInput;
