import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect, useRef} from "react";
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
import {MKColor, Textfield, MKButton} from "react-native-material-kit";
import axios from "axios";
import io from "socket.io-client";

import ChatPreview from "./ChatPreview";
import {sendMessage} from "../actions/sendMessage";
import cfg from "../../config.js";

let socket;

function SingleChat({navigation, state, route, sendMessage}) {
  const [mesArray, setMesArray] = useState([]);
  const [mesText, setMesText] = useState("");

  const getMessages = () => {
    axios
      .get(`${cfg.ip}/chat`, {
        params: {
          chat: {
            name: route.params.chat.name
          }
        },
        headers: {
          Authorization: state.auth.token
        }
      })
      .then(resp => {
           
        console.log(resp.data.messages);
        setMesArray(resp.data.messages);
        console.log("qqqqqqqqqqqqqqqqqqqqqqqqq", mesArray);
      });
  };

  useEffect(() => {
    getMessages();
    socket = io(cfg.ip);
    socket.emit("join", route.params.chat, error => {
      console.log(error);
    });
    socket.on("message", () => getMessages());
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={ref => (this.scrollView = ref)}
        onContentSizeChange={() => {
          this.scrollView.scrollToEnd({animated: true, index: -1}, 200);
        }}
      >
        {mesArray.map((mes, i) => (
          <TouchableOpacity key={i} style={styles.message}>
            <Text>{`${mes.text}`}</Text>
            <View style={styles.messagefooter}>
              <Text style={styles.author}>{`${mes.chatUser.user.name}`}</Text>
              <Text style={styles.date}>{`${mes.createdDate}`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Textfield
          tintColor={MKColor.Lime}
          textInputStyle={{color: MKColor.Orange}}
          placeholder="Text…"
          style={styles.textfield}
          value={mesText}
          onChangeText={e => setMesText(e)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            sendMessage({
              message: {
                chat: {name: route.params.chat.name},
                message: {text: mesText}
              },
              headers: {
                headers: {
                  Authorization: state.auth.token
                }
              }
            });
            socket.emit(
              "sendMessage",
              {
                chat: {name: route.params.chat.name},
                message: {text: mesText}
              },
              () => setMesText("")
            );
          }}
        >
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: "flex-start",
    backgroundColor: "blue",
    flexBasis: "10%"
  },
  message: {
    alignItems: "stretch",
    backgroundColor: "white",
    flexDirection: "column",
    maxHeight: 64,
    flex: 1,
    padding: 3,
    margin: 2,
    backgroundColor: "red"
  },
  messageName: {
    left: 0,
    fontSize: 20
  },
  messagefooter: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textfield: {
    alignSelf: "flex-end",
    backgroundColor: "yellow",
    minWidth: "80%"
  },
  button: {
    minWidth: "20%",
    alignSelf: "center",
    margin: "5%"
  },
  footer: {
    flexDirection: "row",
    padding: 10
  }
});

const mapStateToProps = state => {
  return {
    state: state
  };
};
const mapDispatchToProps = {
  sendMessage: sendMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleChat);
