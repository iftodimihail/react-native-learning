import { useState } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { loginUser } from "../store/authentication";

function LoginScreen({ loginUser, isLoading }) {
  async function loginHandler(credentials) {
    try {
      await loginUser(credentials);
    } catch (err) {
      Alert.alert("Authentication failed!", "Could not log you in. Try again!");
      return;
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Loading user..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default connect(
  (state) => ({
    isLoading: state.auth.loading,
  }),
  { loginUser }
)(LoginScreen);
