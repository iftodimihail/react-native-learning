import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import MealItem from "../components/MealItem";
import { MEALS } from "../data/dummy-data";

function Favorites() {
  const favoriteMeals = useSelector((state) =>
    MEALS.filter((meal) => state.favoriteMeals.ids.includes(meal.id))
  );

  if (!favoriteMeals || favoriteMeals.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noFavoritesText}>You have no favorites yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteMeals}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <MealItem {...item} />}
        style={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  flatListContainer: { flex: 1, padding: 16 },
  noFavoritesText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default Favorites;
