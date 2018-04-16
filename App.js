import React, { Component } from 'react';

import { SwitchNavigator } from 'react-navigation';

import AppScreen from './AppScreen';
import AuthScreen from './AuthScreen';
import AuthLoadingScreen from './AuthLoadingScreen';

export default SwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: AppScreen,
  Auth: AuthScreen
}, {
  initialRouteName: 'AuthLoading'
});