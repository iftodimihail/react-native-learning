import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";

import store from "./store";

import Categories from "./screens/Categories";
import MealsOverview from "./screens/MealsOverview";
import MealInfo from "./screens/MealInfo";
import Favorites from "./screens/Favorites";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        title: "All Categories",
        headerStyle: { backgroundColor: "#c06262" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#e08585" },
        drawerContentStyle: { backgroundColor: "#954848" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#954848",
        drawerActiveBackgroundColor: "#e79e9e",
      }}
    >
      <Drawer.Screen
        name="meals-categories"
        component={Categories}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="favorite-meals"
        component={Favorites}
        options={{
          title: "Favorites",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.rootScreen}>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              title: "All Categories",
              headerStyle: { backgroundColor: "#c06262" },
              headerTintColor: "white",
              contentStyle: { backgroundColor: "#e08585" },
            }}
          >
            <Stack.Screen
              name="drawer"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="meals-overview"
              component={MealsOverview}
              // options={({ route }) => {
              //   const { categoryId } = route.params;
              //   return { title: categoryId };
              // }}
            />
            <Stack.Screen name="meal-info" component={MealInfo} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
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
