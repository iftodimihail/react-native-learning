import { View, StyleSheet, Dimensions } from "react-native";
import { primary800 } from "../../utils/constants/colors";

function Card({ children }) {
  return <View style={styles.cardContainer}>{children}</View>;
}

const deviceWidth = Dimensions.get("window").widthl;

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    backgroundColor: primary800,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});

export default Card;
