import { forwardRef } from "react";
import PhoneInput from "react-native-phone-number-input";

const PhoneInputHOC = forwardRef((props, ref) => {
  return (
    <PhoneInput
      ref={ref}
      defaultCode="US"
      layout="first"
      containerStyle={{
        marginTop: 20,
        width: "100%",
        // backgroundColor: "#eee",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd",
      }}
      countryPickerButtonStyle={{
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        // backgroundColor: "#eee",
        borderRightWidth: 1,
        borderRightColor: "#ddd",
      }}
      codeTextStyle={{
        fontFamily: "EBGaramond-VariableFont_wght",
        // backgroundColor: "yellow",
        margin: 0,
      }}
      textContainerStyle={{
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "flex-start",
      }}
      textInputProps={{
        style: {
          fontFamily: "EBGaramond-VariableFont_wght",
          fontSize: 16,
          // backgroundColor: "green",
          width: "100%",
          display: "flex",
          flex: 1,
          margin: 0,
          color: "black",
        },
      }}
      {...props}
    />
  );
});

export default PhoneInputHOC;
