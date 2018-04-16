import { AppRegistry } from 'react-native';
import App from './App';

console.disableYellowBox = true;
import * as firebase from 'firebase';

import MyFirebaseConfig from './MyFirebaseConfig';

firebase.initializeApp(MyFirebaseConfig);

AppRegistry.registerComponent('RnFbLogin', () => App);
