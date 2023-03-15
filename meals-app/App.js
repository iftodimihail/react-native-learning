import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Categories from "./screens/Categories";
import MealsOverview from "./screens/MealsOverview";

const Stack = createNativeStackNavigator();
const navigationConfig = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default function App() {
  return (
    <View style={styles.rootScreen}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            title: "All Categories",
            headerStyle: { backgroundColor: "#ffaaaad4" },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "#fd9494d4" },
          }}
        >
          <Stack.Screen name="meals-categories" component={Categories} />
          <Stack.Screen
            name="meals-overview"
            component={MealsOverview}
            // options={({ route }) => {
            //   const { categoryId } = route.params;
            //   return { title: categoryId };
            // }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.2,
  },
});
