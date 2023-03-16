import { useLayoutEffect, useMemo } from "react";
import { FlatList } from "react-native";
import { View, StyleSheet } from "react-native";

import MealItem from "../components/MealItem";
import { CATEGORIES, MEALS } from "../data/dummy-data";

function MealsOverview({ route, navigation }) {
  const { categoryId } = route.params;

  const meals = useMemo(
    () => MEALS.filter((meal) => meal.categoryIds.includes(categoryId)),
    [categoryId]
  );

  useLayoutEffect(() => {
    const cateogryTitle = CATEGORIES.find(
      (category) => category.id === categoryId
    ).title;

    navigation.setOptions({ title: cateogryTitle });
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
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
});

export default MealsOverview;
