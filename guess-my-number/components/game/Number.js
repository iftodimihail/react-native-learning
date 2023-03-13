import { StyleSheet, Text, View, Dimensions } from "react-native";
import { accent500 } from "../../utils/constants/colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

// screen: includes status bar / windows: excludes status bar
const deviceWidh = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: accent500,
    padding: deviceWidh < 380 ? 12 : 24,
    margin: deviceWidh < 380 ? 12 : 24,
    borderRadius: 8,
  },
  numberText: {
    fontFamily: "open-sans-bold",
    color: accent500,
    fontSize: deviceWidh < 380 ? 28 : 24,
  },
});

export default NumberContainer;
