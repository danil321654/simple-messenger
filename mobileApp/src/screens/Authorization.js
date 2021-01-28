import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {StyleSheet, Text, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {connect} from "react-redux";
import Login from "./../auth/components/Login";
import Register from "./../auth/components/Register";
import cfg from "../config.js";

const Stack = createStackNavigator();

function Authorization({navigation, auth}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
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

export default connect(mapStateToProps, null)(Authorization);
