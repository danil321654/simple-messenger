import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {StyleSheet, Text, View} from "react-native";
import cfg from "./src/cfg/config.js";

export default function App() {
  const [text, setText] = useState("no");
  useEffect(() => {
    const eff = () =>
      axios
        .get(`${cfg.ip}/home`)
        .then(resp => setText(resp.data))
        .catch(err => console.log(err.message));

    eff();
  }, []);
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
