import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Button,
  TouchableHighlight
} from 'react-native';
import { globalStyles } from '../globalstyles.js';

export class MacroInputScreen extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return(
      <View style={ globalStyles.container }>
        <Text>This is the macro screen</Text>
      </View>
    );
  }
}

export class CalorieInputScreen extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return(
      <View style={ globalStyles.container }>
        <Text>This is the calorie screen</Text>
      </View>
    );
  }
}