import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function MealItem({ title, imageUrl, duration, complexity, affordability }) {
  return (
    <View style={styles.rootContainer}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? { opacity: 0.6 } : null)}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.titleText}>{title}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text>
              <Ionicons name="timer-outline" /> {duration}m
            </Text>
            <Text>
              <Ionicons name="restaurant-outline" /> {complexity.toUpperCase()}
            </Text>
            <Text>
              <Ionicons name="pricetags-outline" />{" "}
              {affordability.toUpperCase()}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 12,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 0 },
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    borderRadius: 8,
  },
  innerContainer: {
    overflow: "hidden",
    borderRadius: 8,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
    margin: 16,
    textAlign: "center",
  },
  image: { width: "100%", height: 200 },
  detailsContainer: {
    flex: 1,
    paddingBottom: 24,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MealItem;
