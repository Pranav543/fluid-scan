import { TextStyle } from "react-native";
import { Text, TextProps } from "./Themed";

export default function MonoText({ children, additionalStyles }) {
  return (
    <Text style={{ ...{ fontFamily: "space-mono" }, ...additionalStyles }}>
      {children}
    </Text>
  );
}
