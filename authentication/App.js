import { useEffect } from "react";
import { connect, Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import { store } from "./store/index";
import IconButton from "./components/ui/IconButton";
import { logoutUser, getStorageToken } from "./store/authentication";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack({ logoutUser }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            color={tintColor}
            size={24}
            onPress={() => logoutUser()}
          />
        ),
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

const ConnectedAuthenticatedStack = connect(null, { logoutUser })(
  AuthenticatedStack
);

function Navigation({ isAuthenticated, getStorageToken }) {
  useEffect(() => {
    getStorageToken();
  }, []);

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <ConnectedAuthenticatedStack />}
    </NavigationContainer>
  );
}

const ConnectedNavigation = connect(
  (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }),
  { getStorageToken }
)(Navigation);

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <ConnectedNavigation />
      </Provider>
    </>
  );
}
