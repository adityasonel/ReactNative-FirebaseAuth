import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native';

import firebase from 'firebase';
import fbsdk from 'react-native-fbsdk';
const { LoginManager } = fbsdk;

import { GoogleSignin } from 'react-native-google-signin';

export default class AppScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      auth_type: ''
    }
  }

  async getAuthType() {
    await AsyncStorage.getItem('auth_type').then(value => {
      this.setState({
        auth_type: value
      })
    }).catch(error => {
      console.log(error);
    });
  }

  componentWillMount() {
    console.log(firebase.auth().currentUser);
    this.getAuthType();
  }

_logout = () => {
    if(this.state.auth_type == 'google'){
      GoogleSignin.signOut().then(() => {
        console.log('google signout')
        firebase.auth().signOut();
      });
    } else if (this.state.auth_type == 'facebook') {
      LoginManager.logOut().then(() => {
        console.log('facebook signout')
        firebase.auth().signOut();
      });
    }
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