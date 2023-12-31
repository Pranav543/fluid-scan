import { ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "../components/Themed";
import Colors from "../constants/Colors";
import Web3 from "web3";
import { MonoText } from "../components/StyledText";
import * as WebBrowser from "expo-web-browser";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { ThemeContext } from "../context/ThemeProvider";

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

export default function Storage(props) {
  const { contractData } = props;
  const { styles } = useContext(ThemeContext);
  const connector = useWalletConnect();
  const [storageValue, setStorageValue] = useState();
  const [storageInput, setStorageInput] = useState("0");
  const [contractLink, setContractLink] = useState();
  const [settingStorage, setSettingStorage] = useState(false);
  const [gettingStorage, setGettingStorage] = useState(false);
  const contract = contractData
    ? new web3.eth.Contract(contractData.abi, contractData.address)
    : null;

  useEffect(() => {
    if (contractData) {
      setContractLink(
        `https://alfajores-blockscout.celo-testnet.org/address/${contractData.address}`
      );
    }
  }, [contractData]);

  const setStorage = async () => {
    setSettingStorage(true);
    try {
      let txData = await contract?.methods.store(storageInput).encodeABI();

      await connector.sendTransaction({
        from: connector.accounts[0],
        to: contractData.address,
        data: txData,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setSettingStorage(false);
    }
  };

  const getStorage = async () => {
    setGettingStorage(true);
    try {
      const result = await contract?.methods.retrieve().call();
      setStorageValue(result);
    } catch (e) {
      console.log(e);
    } finally {
      setGettingStorage(false);
    }
  };

  function handlePress() {
    WebBrowser.openBrowserAsync(contractLink);
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Storage Contract</Text>
        <TouchableOpacity style={styles.externalLink} onPress={handlePress}>
          <Text style={styles.externalLink}>
            {`${contractData.address.substr(
              0,
              5
            )}...${contractData.address.substr(-5)}`}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.innerContainer}>
        <Text>Write Contract</Text>
        <TextInput
          value={storageInput}
          onChangeText={(newValue) => setStorageInput(newValue)}
          style={styles.textInput}
        />
        {settingStorage ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <TouchableOpacity onPress={setStorage}>
            <Text>Update Storage Contract</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.separator}></View>
      <View style={styles.innerContainer}>
        <Text>Read Contract</Text>
        {storageValue ? (
          <Text style={{ marginVertical: 10 }}>
            Storage Contract Value: {storageValue}
          </Text>
        ) : null}
        {gettingStorage ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <TouchableOpacity onPress={getStorage}>
            <Text>Read Storage Contract</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
