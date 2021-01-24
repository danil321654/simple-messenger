import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {StyleSheet, Text, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./../auth/components/Login";
import Register from "./../auth/components/Register";
import cfg from "../config.js";

const Stack = createStackNavigator();

export default function Authorization({navigation}) {
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
    alignItems: "center",
    justifyContent: "center"
  }
});
