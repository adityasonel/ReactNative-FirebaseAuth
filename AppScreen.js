import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import firebase from 'firebase';
import fbsdk from 'react-native-fbsdk';
const { LoginManager } = fbsdk;

export default class AppScreen extends Component {

componentDidMount() {
    console.log(firebase.auth().currentUser);
}

_logout = () => {
    console.log('logout');
    LoginManager.logOut();
    firebase.auth().signOut();
}

render() {
    return (
      <View style={styles.container}>
        <Text style = {{textAlign: 'center', fontSize: 22, fontWeight: 'bold', marginBottom: 10}} >Welcome to React Native!</Text>
        <Button
            color = {'tomato'}
            title = {'Logout'}
            onPress = {this._logout} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});