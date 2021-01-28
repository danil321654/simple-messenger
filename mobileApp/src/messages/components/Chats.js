import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import ChatPreview from "./ChatPreview";
import cfg from "../../config.js";

function Chats({navigation, state}) {
  const [mesArray, setMesArray] = useState([]);
  useEffect(() => {
    axios
      .get(`${cfg.ip}/chats`, {
        headers: {Authorization: state.auth.token}
      })
      .then(resp => setMesArray(resp.data));
  }, [state]);

  return (
    <View style={styles.container}>
      {mesArray.map((chat, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => navigation.navigate("SingleChat", {chat: chat})}
        >
          <ChatPreview chat={chat} />
        </TouchableOpacity>
      ))}
      {mesArray.map((chat, i) => (
        <ChatPreview key={i * 2} chat={chat} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  input: {
    fontSize: 20,
    height: 60,
    width: 250
  },
  hidButton: {
    backgroundColor: "rgba(0,0,0,0)",
    color: "rgba(0,0,0,0.3)",
    fontSize: 13,
    margin: 13
  }
});

const mapStateToProps = state => {
  return {
    state: state
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, null)(Chats);
