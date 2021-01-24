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
import {createStackNavigator} from "@react-navigation/stack";
import cfg from "../../config.js";
import {login} from "../actions/login.js";

const Stack = createStackNavigator();

function Login({navigation, login}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Text>Login</Text>

      <TextInput
        style={styles.input}x
        placeholder="Username"
        returnKeyType="go"
        autoCorrect={false}
        onChangeText={value => setUsername(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        returnKeyType="go"
        secureTextEntry
        autoCorrect={false}
        onChangeText={value => setPassword(value)}
      />
      <Button title="login" onPress={() => login({username, password})} />

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.hidButton}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
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

const mapDispatchToProps = {
  login: login
};

export default connect(null, mapDispatchToProps)(Login);
