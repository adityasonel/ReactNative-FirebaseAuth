import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, AsyncStorage } from 'react-native';

import firebase from 'firebase';

export default class AuthLoadingScreen extends React.Component {
    
    constructor(props) {
      super(props);

      this._isAuthStateChanged();
    }

    componentDidMount() {
        
    }

    _isAuthStateChanged = async () => {
          firebase.auth().onAuthStateChanged((user) => {
              console.log('User details: ', user);
              this.props.navigation.navigate(user ? 'App' : 'Auth');
        });
    };

    render() {
      return (
        <View style={{
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center'}}>
          
          <ActivityIndicator
            size = {'large'}
            color = {'tomato'} />
        </View>
      );
    }
  }
