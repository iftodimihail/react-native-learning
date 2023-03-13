import { Text, StyleSheet } from "react-native";
import { accent500 } from "../../utils/constants/colors";

function InstructionText({ children, style }) {
  return <Text style={[styles.textContainer, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  textContainer: {
    fontFamily: "open-sans",
    color: accent500,
    fontSize: 24,
  },
});

export default InstructionText;
