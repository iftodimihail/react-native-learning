import { connect } from "react-redux";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import AuthContent from "../components/Auth/AuthContent";
import { signUpUser } from "../store/authentication";

function SignupScreen({ isLoading, signUpUser }) {
  async function signUpHandler(credentials) {
    try {
      await signUpUser(credentials);
    } catch (err) {
      Alert.alert("Sign up failed!", "Could not create the user. Try again!");
      return;
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default connect(
  (state) => ({
    isLoading: state.auth.loading,
  }),
  { signUpUser }
)(SignupScreen);
