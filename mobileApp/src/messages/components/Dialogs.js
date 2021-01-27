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
import cfg from "../../config.js";

function Dialogs({navigation, state}) {
  const [mesArray, setMesArray] = useState([]);
  useEffect(() => {
    axios
      .get(`${cfg.ip}/dialogs`, {
        headers: {Authorization: state.auth.token}
      })
      .then(resp => setMesArray(resp.data));
  }, [state]);

  return (
    <View style={styles.container}>
      {mesArray.map((dialog, i) => (
        <View key={i}>
          <Text>{dialog.name}</Text>
          <View>
            <Text>
              {`${dialog.lastMessage.dialogUser.user.name} - ${dialog.lastMessage.text}`}
            </Text>
          </View>
        </View>
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
    alignItems: "center",
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

export default connect(mapStateToProps, null)(Dialogs);
