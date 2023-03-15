import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Pressable, Text, Platform } from "react-native";

const CategoryGridTile = ({ title, color, id }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.gridItemContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.buttonPressed, styles.button] : [styles.button]
        }
        android_ripple={{ color: "#ccc" }}
        onPress={() =>
          navigation.navigate("meals-overview", { categoryId: id })
        }
      >
        <View style={[styles.gridItem, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItemContainer: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.6,
  },
  gridItem: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default CategoryGridTile;
