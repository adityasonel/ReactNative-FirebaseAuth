import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import firebase from 'firebase';
import fbsdk from 'react-native-fbsdk';
const { LoginManager, AccessToken } = fbsdk;

export default class AuthScreen extends Component {

    componentDidMount() {
        console.log(firebase.auth().currentUser);
    }

    _googleLogin = () => {
        console.log('google login')
    }

    _facebookLogin = () => {
        console.log('facebook login')

        LoginManager.logInWithReadPermissions(['email', 'public_profile']).then(result => {
            console.log('fb login result', result);
            if (result.isCancelled){
                console.log('Facebook Login Cancelled');
            } else {
                AccessToken.getCurrentAccessToken().then(data => {
                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                    firebase.auth().signInAndRetrieveDataWithCredential(credential);
                })
            }
        }, error => {
            console.log('error while fb login', error);
        })
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style = {{textAlign: 'center', fontSize: 22, fontWeight: 'bold', marginBottom: 10}} >Welcome to React Native!</Text>
          <Button
              color = {'tomato'}
              onPress = {this._googleLogin}
              title = {'Google Login'} />
          <Button
              color = {'tomato'}
              onPress = {this._facebookLogin}
              title = {'Facebook Login'} />
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