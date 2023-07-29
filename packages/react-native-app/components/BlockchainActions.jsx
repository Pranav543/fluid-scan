const React = require("react");
const { useWeb3Modal, Web3Button } = require("@web3modal/react-native");
const { ethers } = require("ethers");
const { useMemo, useState } = require("react");
const {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} = require("react-native");

const {
  getFilterChanges,
  readContract,
  ethSign,
  sendTransaction,
  signMessage,
  signTransaction,
  signTypedData,
} = require("../utils/MethodUtil");

function BlockchainActions() {
  const [rpcResponse, setRpcResponse] = useState();
  const [rpcError, setRpcError] = useState();
  const { provider } = useWeb3Modal();

  const web3Provider = useMemo(
    () => (provider ? new ethers.providers.Web3Provider(provider) : undefined),
    [provider]
  );

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onModalClose = () => {
    setModalVisible(false);
    setLoading(false);
    setRpcResponse(undefined);
    setRpcError(undefined);
  };

  const getEthereumActions = () => {
    const wrapRpcRequest = (method, rpcRequest) => async () => {
      if (!web3Provider) {
        return;
      }

      setRpcResponse(undefined);
      setRpcError(undefined);
      setModalVisible(true);
      try {
        setLoading(true);
        const result = await rpcRequest({ web3Provider, method });
        setRpcResponse(result);
        setRpcError(undefined);
      } catch (error) {
        console.error("RPC request failed:", error);
        setRpcResponse(undefined);
        setRpcError({ method, error: error?.message });
      } finally {
        setLoading(false);
      }
    };

    const actions = [
      {
        method: "eth_sendTransaction",
        callback: wrapRpcRequest("eth_sendTransaction", sendTransaction),
      },
      {
        method: "eth_signTransaction",
        callback: wrapRpcRequest("eth_signTransaction", signTransaction),
      },
      {
        method: "personal_sign",
        callback: wrapRpcRequest("personal_sign", signMessage),
      },
      {
        method: "eth_sign (standard)",
        callback: wrapRpcRequest("eth_sign (standard)", ethSign),
      },
      {
        method: "eth_signTypedData",
        callback: wrapRpcRequest("eth_signTypedData", signTypedData),
      },
      {
        method: "read contract (mainnet)",
        callback: wrapRpcRequest("read contract", readContract),
      },
      {
        method: "filter contract (mainnet)",
        callback: wrapRpcRequest("filter contract", getFilterChanges),
      },
    ];
    return actions;
  };

  return (
    <>
      <FlatList
        data={getEthereumActions()}
        ListHeaderComponent={
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
        }
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "black" },
              {
                paddingHorizontal: 15,
                paddingVertical: 7,
                marginTop: 10,
                borderRadius: 5,
              },
            ]}
            key={item.method}
            onPress={() => item.callback(web3Provider)}
          >
            <Text style={styles.buttonText}>{item.method}</Text>
          </TouchableOpacity>
        )}
      />
      <RequestModal
        rpcResponse={rpcResponse}
        rpcError={rpcError}
        isLoading={loading}
        isVisible={modalVisible}
        onClose={onModalClose}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3396FF",
    borderRadius: 20,
    width: 200,
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginTop: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  modalContainer: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontWeight: "bold",
    marginVertical: 4,
  },
  responseText: {
    fontWeight: "300",
  },
  listContent: {
    alignItems: "center",
  },
  web3Button: {
    width: 200,
  },
});

// Exporting the component for use in other files, if needed
module.exports = BlockchainActions;
