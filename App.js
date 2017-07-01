import React from 'react';
import { StyleSheet, Text, View, AppRegistry, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

class TestScreen extends React.Component {
  static navigationOptions = {
    title: 'TestScreen',
  };

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View style={styles.container}>
        <Text> TestScreen </Text>
      </View>
    );
  }
}

class LandingScreen extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainNav}>
        <Button 
          style={styles.mainNavButton}
          title="Input Macros"
          onPress={() => navigate('Test')}
        />
        <Button 
          style={styles.mainNavButton}
          title="Input Calories"
          onPress={() => navigate('Test')}
        />
      </View>
      
    );
  }
}

const MainNavigation = StackNavigator({
  Default: { screen: LandingScreen },
  Test: { screen: TestScreen },
});

export default class App extends React.Component {
  render() {
    return (
      <MainNavigation />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainNav: {
    flex: 1,
    flexDirection: 'row',
  },
  mainNavButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50
  }
});
