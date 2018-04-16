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
const { LoginManager, AccessToken } = fbsdk;

import { GoogleSignin } from 'react-native-google-signin';

export default class AuthScreen extends Component {

    componentDidMount() {
        console.log(firebase.auth().currentUser);
    }

    _googleLogin = () => {
        console.log('google login')

        GoogleSignin.configure({
            iosClientId: '580643791568-tette3ckn2ukm5b8jq93vlc5ve70c6ke.apps.googleusercontent.com',
        });
        GoogleSignin.signIn().then(data => {
            const credentials = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
            firebase.auth().signInAndRetrieveDataWithCredential(credentials).then(() => {
                AsyncStorage.setItem('auth_type', 'google');
            }).catch(error => {
                console.log(error);
            });
        })
    }

    _facebookLogin = () => {
        console.log('facebook login')

        LoginManager.logInWithReadPermissions(['email', 'public_profile']).then(result => {
            console.log('fb login result', result);
            if (result.isCancelled){
                console.log('Facebook Login Cancelled');
            } else {
                AccessToken.getCurrentAccessToken().then(data => {
                    console.log(data);
                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                    firebase.auth().signInAndRetrieveDataWithCredential(credential).then(() => {
                        AsyncStorage.setItem('auth_type', 'facebook');
                    }).catch(error => {
                        console.log(error);
                    });
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