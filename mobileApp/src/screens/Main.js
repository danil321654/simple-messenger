import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {StyleSheet, Text, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {connect} from "react-redux";
import Chats from "./../messages/components/Chats";
import SingleChat from "./../messages/components/SingleChat";
import CreateNewChat from "./../messages/components/CreateNewChat";
import cfg from "../config.js";

const Stack = createStackNavigator();

function Main({navigation, auth}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="SingleChat" component={SingleChat} />
      <Stack.Screen name="CreateNewChat" component={CreateNewChat} />
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

export default connect(mapStateToProps, null)(Main);
