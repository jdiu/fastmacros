import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Button,
  TouchableHighlight
} from 'react-native';
import globalStyles from '../globalstyles.js';

export default class ResultsScreen extends React.Component {
  static navigationOptions = {
    title: 'TestScreen',
  };

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View style={globalStyles.data.container}>
        <Text> TestScreen </Text>
      </View>
    );
  }
}