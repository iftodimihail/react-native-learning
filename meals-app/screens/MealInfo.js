import { useCallback, useLayoutEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { MEALS } from "../data/dummy-data";
import {
  addFavorite,
  removeFavorite,
  toggleFavorite,
} from "../store/favorites";

function MealInfo({ route, navigation }) {
  const { mealId } = route.params;
  const { imageUrl, duration, complexity, affordability, ingredients, steps } =
    useMemo(() => MEALS.find((meal) => meal.id === mealId), [mealId]);

  const favoriteMeals = useSelector((state) => {
    return state.favoriteMeals.ids;
  });

  const mealIsFavorite = useMemo(() => {
    return favoriteMeals.includes(mealId);
  }, [favoriteMeals, mealId]);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const cateogryTitle = MEALS.find((meal) => meal.id === mealId).title;

    navigation.setOptions({
      title: cateogryTitle,
      headerRight: () => (
        <Pressable
          style={({ pressed }) => (pressed ? [{ opacity: 0.7 }] : [])}
          onPress={() => dispatch(toggleFavorite({ id: mealId }))}
        >
          <Ionicons
            name={mealIsFavorite ? "star" : "star-outline"}
            size={24}
            color="white"
          />
        </Pressable>
      ),
    });
  }, [mealIsFavorite, mealId]);

  return (
    <View style={styles.rootContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.text}>
          <Ionicons name="timer-outline" /> {duration}m
        </Text>
        <Text style={styles.text}>
          <Ionicons name="restaurant-outline" /> {complexity.toUpperCase()}
        </Text>
        <Text style={styles.text}>
          <Ionicons name="pricetags-outline" /> {affordability.toUpperCase()}
        </Text>
      </View>
      <ScrollView style={styles.details}>
        <Text style={styles.detailsTitle}>Ingredients</Text>
        {ingredients.map((ingredient) => (
          <Text key={ingredient} style={styles.listItem}>
            {ingredient}
          </Text>
        ))}
        <Text style={styles.detailsTitle}>Steps</Text>
        {steps.map((step) => (
          <Text key={step} style={styles.listItem}>
            {step}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  detailsContainer: {
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: { width: "100%", height: 200 },
  text: {
    color: "white",
    fontSize: 16,
  },
  details: {
    flex: 1,
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  detailsTitle: {
    fontWeight: "bold",
    fontSize: 20,
    borderBottomWidth: 2,
    marginVertical: 12,
    textAlign: "center",
    paddingBottom: 8,
    color: "#ffc5c5",
    borderBottomColor: "#ffc5c5",
  },
  listItem: {
    padding: 8,
    backgroundColor: "#ffc5c5",
    marginVertical: 4,
    borderRadius: 6,
    color: "#a34a4a",
  },
});

export default MealInfo;
