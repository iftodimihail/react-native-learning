import { Pressable, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import { Provider } from "react-redux";
import store from "./store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: "#ccc",
        tabBarLabelStyle: { fontWeight: "bold" },
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              icon="add-circle-outline"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate("manage-expense")}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="recent-expenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: (props) => <Ionicons name="hourglass" {...props} />,
        }}
      />
      <Tab.Screen
        name="all-expenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarIcon: (props) => <Ionicons name="calendar" {...props} />,
        }}
      />
    </Tab.Navigator>
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
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
              tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              tabBarActiveTintColor: GlobalStyles.colors.accent500,
              tabBarInactiveTintColor: "#ccc",
              tabBarLabelStyle: { fontWeight: "bold" },
            }}
          >
            <Stack.Screen
              name="expenses"
              component={ExpensesOverview}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="manage-expense"
              component={ManageExpense}
              options={{
                title: "Manage Expense",
                presentation: "modal",
              }}
            />
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
});
