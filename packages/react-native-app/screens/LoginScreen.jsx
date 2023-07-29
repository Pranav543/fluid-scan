import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { Web3Button } from "@web3modal/react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Web3Button
        style={[
          { backgroundColor: "black" },
          {
            paddingHorizontal: 15,
            paddingVertical: 7,
            marginTop: 10,
            borderRadius: 5,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
