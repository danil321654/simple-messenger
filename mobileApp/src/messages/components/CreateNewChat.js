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
import {createStackNavigator} from "@react-navigation/stack";
import cfg from "../../config.js";
import {addChat} from "../actions/addChat";

const Stack = createStackNavigator();

function CreateNewChat({navigation, state, addChat}) {
  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [users, setUsers] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${cfg.ip}/users`, {
        headers: {Authorization: state.auth.token}
      })
      .then(resp => setUsers(resp.data));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Create new chat</Text>

      <TextInput
        style={styles.input}
        x
        placeholder="Chat name"
        returnKeyType="go"
        autoCorrect={false}
        onChangeText={value => setName(value)}
      />
      <Button
        title="Add chat"
        onPress={() =>
          addChat({
            chat: {
              name: name,
              users: chatUsers
            },
            headers: {
              headers: {
                Authorization: state.auth.token
              }
            }
          })
        }
        disabled={name.length == 0}
      />
      <View style={styles.addedUsers}>
        {chatUsers.map((user, i) => (
          <View key={i} style={styles.addedUsersCard}>
            <Text>{user}</Text>

            <TouchableOpacity
              style={styles.removeUser}
              onPress={() =>
                setChatUsers(chatUsers.filter(chatUser => chatUser != user))
              }
            >
              <Text>x</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TextInput
        style={styles.input}
        x
        placeholder="Search user"
        returnKeyType="go"
        autoCorrect={false}
        onChangeText={value => setSearchName(value)}
      />
      {searchName.length > 0 &&
        users
          .filter(
            username =>
              username != state.auth.user.username &&
              username.includes(searchName) &&
              !chatUsers.includes(username)
          )
          .slice(0, 3)
          .map((user, i) => (
            <View key={i} style={styles.addUser}>
              <Text style={styles.addUserText}>{user}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setChatUsers([...chatUsers, user])}
              >
                <Text style={styles.addUserText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    fontSize: 20,
    height: 60,
    width: 250
  },
  addedUsers: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  addedUsersCard: {
    backgroundColor: "rgb(214, 214, 214)",
    flexDirection: "row",
    padding: 5,
    margin: 3,
    borderRadius: 3
  },
  addUser: {
    flexDirection: "row",
    minHeight: 50,
    minWidth: "80%",
    justifyContent: "space-between",
    backgroundColor: "yellow",
    alignItems: "center"
  },
  removeUser: {
    marginLeft: 5,
    minWidth: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.68)",
    borderWidth: 2
  },
  addUserText: {
    minWidth: "5%",
    backgroundColor: "blue",

    position: "absolute",
    left: 10
  },
  addButton: {
    position: "absolute",
    right: 10,
    alignSelf: "flex-end",
    minWidth: 40,
    minHeight: 40,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderColor: "rgba(0, 0, 0, 0.68)",
    borderWidth: 2
  }
});

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = {
  addChat: addChat
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewChat);
