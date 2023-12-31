import { View, StyleSheet, Image } from "react-native";
import Screen from "../components/Screen";
import PhoneInputHOC from "../components/PhoneInputHOC";
import Button from "../components/Button";
import { useWeb3Modal } from "@web3modal/react-native";
import { H4, SmallText } from "../components/Typography";
import React, { useContext, useReducer, useState } from "react";
import Input from "../components/Input";
import { TouchableOpacity } from "react-native";
import { createContext } from "react";
import KitContext from "../context/KitContext";

const INITIAL_STATE = {
  flow: "REGISTRATION",
  phoneNumber: "",
  formattedPhoneNumber: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "flowChange":
      return { ...state, flow: action.payload };
    case "phoneNumber":
      return { ...state, phoneNumber: action.payload };
    case "formattedPhoneNumber":
      return { ...state, formattedPhoneNumber: action.payload };
    default:
      return state;
  }
}

const RegistrationContext = createContext(null);

const RegistrationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <RegistrationContext.Provider value={{ state, dispatch }}>
      {children}
    </RegistrationContext.Provider>
  );
};

function Registration() {
  const { address, provider } = useWeb3Modal();
  const { state, dispatch } = useContext(RegistrationContext);
  const { registerIdentifier } = useContext(KitContext);
  const [isRegistering, setIsRegistering] = useState(false);
  async function handleRegister() {
    setIsRegistering(true);
    try {
      await registerIdentifier(state.formattedPhoneNumber, address);
    } catch (e) {
      console.log(e);
    } finally {
      setIsRegistering(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <SmallText style={{ marginTop: 5 }}>
        Registering address:{" "}
        <SmallText
          style={{
            fontFamily: "Jost-500-Medium",
            fontSize: 14,
            color: "green",
          }}
        >{`${address.substring(0, 6)}...${address.substring(36)}`}</SmallText>
      </SmallText>
      <SmallText style={{ marginTop: 5 }}>
        Please enter your phone number
      </SmallText>
      <PhoneInputHOC
        value={state.phoneNumber}
        onChangeText={(text) =>
          dispatch({ type: "phoneNumber", payload: text })
        }
        onChangeFormattedText={(text) =>
          dispatch({ type: "formattedPhoneNumber", payload: text })
        }
      />
      <Button
        title="Register"
        onPress={handleRegister}
        isLoading={isRegistering}
        // onPress={() => dispatch({type: 'flowChange', payload: 'OTP'})}
      />
      <SmallText style={{ marginTop: 20 }}>
        This is the screen to register your phone number and link your EVM
        address to it
      </SmallText>
    </View>
  );
}

function OTP() {
  const address = useAddress();
  const { state, dispatch } = useContext(RegistrationContext);

  return (
    <View style={{ flex: 1 }}>
      <SmallText style={{ marginTop: 5 }}>
        Registering address:{" "}
        <SmallText
          style={{
            fontFamily: "Jost-500-Medium",
            fontSize: 14,
            color: "green",
          }}
        >{`${address.substring(0, 6)}...${address.substring(36)}`}</SmallText>
      </SmallText>
      <SmallText style={{ marginTop: 5 }}>
        Please enter OTP we sent on {state.formattedPhoneNumber}
      </SmallText>
      <Input
        keyboardType="number-pad"
        style={{ textAlign: "center", fontSize: 24 }}
        maxLength={6}
      />
      <TouchableOpacity
        style={{
          alignSelf: "center",
          marginTop: 10,
        }}
        activeOpacity={1}
        onPress={() =>
          dispatch({ type: "flowChange", payload: "REGISTRATION" })
        }
      >
        <SmallText style={{ textAlign: "center" }}>Change Number</SmallText>
      </TouchableOpacity>
      <Button title="Submit" />
    </View>
  );
}

function RegisterContent() {
  const { state, dispatch } = useContext(RegistrationContext);
  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/images/phone_mapping.png")}
        style={{
          height: 200,
          width: 200,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />
      <H4>Register</H4>
      {state.flow === "REGISTRATION" ? <Registration /> : <OTP />}
    </View>
  );
}

export default function Register(props) {
  return (
    <React.Fragment>
      <Screen>
        <RegistrationProvider>
          <RegisterContent />
        </RegistrationProvider>
      </Screen>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    borderBottomWidth: 1,
  },
});
