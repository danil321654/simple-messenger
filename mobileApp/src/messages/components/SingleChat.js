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

function SingleChat({navigation, state, route}) {
  const [mesArray, setMesArray] = useState([]);
  let chat = route.params.chat;
  axios
    .post(
      `${cfg.ip}/chat`,
      {
        chat: {
          name: chat.name
        }
      },
      {
        headers: {
          Authorization: state.auth.token
        }
      }
    )
    .then(resp => {
      setMesArray(resp.data.messages);
      console.log("qqqqqqqqqqqqqqqqqqqqqqqqq", mesArray);
    });
  useEffect(() => {}, [state, chat]);

  return (
    <View style={styles.container}>
      {mesArray.map((mes, i) => (
        <TouchableOpacity key={i}>
          <View style={styles.message}>
            <View>
              <Text>{`${mes.text}`}</Text>
              <View style={styles.footer}>
                <Text style={styles.author}>{`${mes.chatUser.user.name}`}</Text>
                <Text style={styles.date}>{`${mes.createdDate}`}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
  message: {
    alignItems: "stretch",
    backgroundColor: "white",
    flexDirection: "column",
    flex: 1,
    padding: 3
  },
  messageName: {
    left: 0,
    fontSize: 20
  },
  footer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white"
  }
});

const mapStateToProps = state => {
  return {
    state: state
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, null)(SingleChat);
