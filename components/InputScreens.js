import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Button,
  TouchableHighlight
} from 'react-native';

export class MacroInputScreen extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return(
      <Text>This is the macro screen</Text>
    );
  }
}

export class CalorieInputScreen extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return(
      <Text>This is the calorie screen</Text>
    );
  }
}