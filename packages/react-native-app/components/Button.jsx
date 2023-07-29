import { TouchableOpacity } from "react-native";

export default function Button(props) {
  const { style, lightColor, darkColor, children, ...otherProps } = props;

  return (
    <TouchableOpacity
      style={[
        { backgroundColor: "black" },
        style,
        {
          paddingHorizontal: 15,
          paddingVertical: 7,
          marginTop: 10,
          borderRadius: 5,
        },
      ]}
      {...otherProps}
    >
      {children}
    </TouchableOpacity>
  );
}
