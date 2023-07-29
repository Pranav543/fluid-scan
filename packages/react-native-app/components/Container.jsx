import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import Colors from "../constants/Colors";

const Container = ({ children, style }) => {
  return (
    <View
      style={{
        backgroundColor: Colors.brand.yellow[75],
        borderRadius: 5,
        padding: 10,
        width: "100%",
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export default Container;
