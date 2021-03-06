import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  ScrollView
} from "react-native";
import axios from "axios";
import io from "socket.io-client";
import ChatPreview from "./ChatPreview";
import cfg from "../../config.js";

let socket;

function Chats({navigation, state}) {
  const [mesArray, setMesArray] = useState([]);
  const getChats = () => {
    axios
      .get(`${cfg.ip}/chats`, {
        headers: {Authorization: state.auth.token}
      })
      .then(resp => {
        setMesArray(resp.data);
      });
  };
  useEffect(() => {
    getChats();
    socket = io(cfg.ip);
    mesArray.map((chat, i) => {
      socket.emit("join", chat, error => {
        console.log(error);
      });
    });

    socket.on("message", () => getChats());
  }, [state]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {mesArray.length > 0 &&
          mesArray.map((chat, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => navigation.navigate("SingleChat", {chat: chat})}
            >
              <ChatPreview chat={chat} />
            </TouchableOpacity>
          ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CreateNewChat")}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
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
  addButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    alignSelf: "flex-end",
    minWidth: 40,
    minHeight: 40,

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.68)",
    borderWidth: 2
  },
  buttonText: {
    fontSize: 20
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
