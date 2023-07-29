import { useContext } from "react";
import { Text, TextStyle } from "react-native";
import { ThemeContext } from "../context/ThemeProvider";

export const H1 = ({ children, additionalStyles }) => {
  const { styles } = useContext(ThemeContext);
  return (
    <Text style={{ ...styles.h1, fontFamily: "Inter", ...additionalStyles }}>
      {children}
    </Text>
  );
};

export const H2 = ({ children, additionalStyles }) => {
  const { styles } = useContext(ThemeContext);
  return (
    <Text style={{ ...styles.h2, fontFamily: "Inter", ...additionalStyles }}>
      {children}
    </Text>
  );
};

export const H3 = ({ children, additionalStyles }) => {
  const { styles } = useContext(ThemeContext);
  return (
    <Text style={{ ...styles.h3, fontFamily: "Inter", ...additionalStyles }}>
      {children}
    </Text>
  );
};

export const H4 = ({ children, additionalStyles }) => {
  const { styles } = useContext(ThemeContext);
  return (
    <Text style={{ ...styles.h4, fontFamily: "Inter", ...additionalStyles }}>
      {children}
    </Text>
  );
};

export const H5 = ({ children, additionalStyles }) => {
  const { styles } = useContext(ThemeContext);
  return (
    <Text style={{ ...styles.h5, fontFamily: "Inter", ...additionalStyles }}>
      {children}
    </Text>
  );
};

export const H6 = ({ children, additionalStyles }) => {
  const { styles } = useContext(ThemeContext);
  return (
    <Text style={{ ...styles.h6, fontFamily: "Inter", ...additionalStyles }}>
      {children}
    </Text>
  );
};
