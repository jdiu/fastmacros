import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Button,
  TouchableHighlight
} from 'react-native';
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

class MacroInputScreen extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return(
      <Text>This is the macro screen</Text>
    );
  }
}

class CalorieInputScreen extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return(
      <Text>This is the calorie screen</Text>
    );
  }
}

class LandingScreen extends React.Component {
  constructor (props) {
    super(props);
    // Default settings, add support for user settings
    this.state = {
      calories: 2000,
      protein: .33,
      fat: .33,
      carb: .34,
      calorieMode: true
    }
  }


  // Use these for optimization (anti-pattern) or nah in touchablehighlights
  // _onPressCal = () => { this.setState({ calorieMode: true }); console.log("cal pressed"); };

  render () {
    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.mainNav }>
        <View style={ styles.buttonContainer }>
          <TouchableHighlight style={ styles.button } onPress={ () => this.setState({ calorieMode: false }) }>
            <Text>Input Macros</Text>
          </TouchableHighlight>
          <TouchableHighlight style={ styles.button } onPress={ () => this.setState({ calorieMode: true }) }>
            <Text>Input Calories</Text>
          </TouchableHighlight>
        </View>
        <View style={ styles.contentContainer }>
          { this.state.calorieMode ? <CalorieInputScreen /> : <MacroInputScreen /> }
        </View>
        <View style={ styles.buttonContainer }>
          <TouchableHighlight style={ styles. button } onPress = { () => navigate('Test') }>
            <Text>Next Screen</Text>
          </TouchableHighlight>
        </View>
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 8,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  button: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'blue',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    justifyContent: 'center'
  }
});
