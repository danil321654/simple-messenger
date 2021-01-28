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
  Dimensions
} from "react-native";

import axios from "axios";
import cfg from "../../config.js";

const styles = StyleSheet.create({
  container: {
    flex: 0,
    margin: 3,
    padding: 5,
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "white",
    borderRadius: 7,
    borderColor: "rgba(0, 0, 0, 0.68)",
    borderWidth: 2
  },
  image: {
    margin: 5,
    fontSize: 40,
    width: 55,
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 0.68)",
    borderWidth: 2
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

function ChatPreview({navigation, state, chat}) {
  const [mesArray, setMesArray] = useState([]);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.image}></Text>
      </View>
      <View style={styles.message}>
        <Text style={styles.messageName}>{chat.name}</Text>
        <View>
          <Text>{`${chat.lastMessage.text}`}</Text>
          <View style={styles.footer}>
            <Text
              style={styles.author}
            >{`${chat.lastMessage.chatUser.user.name}`}</Text>
            <Text
              style={styles.date}
            >{`${chat.lastMessage.createdDate}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    state: state
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, null)(ChatPreview);
