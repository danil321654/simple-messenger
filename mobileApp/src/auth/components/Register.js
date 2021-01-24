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
import cfg from "../../config.js";
import {register} from "../actions/register.js";

function Register({navigation, register}) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        returnKeyType="go"
        autoCorrect={false}
        onChangeText={value => setName(value)}
      />
      <TextInput
        style={styles.input}
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
      <Button
        title="register"
        onPress={() => register({name, username, password})}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.hidButton}>LOGIN</Text>
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
  register: register
};

export default connect(null, mapDispatchToProps)(Register);
