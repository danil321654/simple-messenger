import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {StyleSheet, Text, View} from "react-native";
import {connect, Provider} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import Authorization from "./screens/Authorization";
import Main from "./screens/Main";
import cfg from "./config.js";

const Stack = createStackNavigator();

function Container({navigation, auth}) {
  const [authenticated, setAutheficated] = useState(false);
  useEffect(() => {
    const checkForLogin = async () => {
      if (auth.token && auth.user) {
        let logged_in = await axios.get(`${cfg.ip}/logged_in`, {
          headers: {Authorization: auth.token}
        });
        setAutheficated(logged_in);
      }
    };
    checkForLogin();
  }, [auth]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {!authenticated && (
        <Stack.Screen name="Authorization" component={Authorization} />
      )}
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, null)(Container);
