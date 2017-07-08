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
import { MacroInputScreen, CalorieInputScreen } from './components/InputScreens';
import ResultsScreen from './components/ResultsScreen';
import { globalStyles } from './globalstyles.js';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

const MacroRoute = () => <View style={globalStyles.container}><MacroInputScreen /></View>;
const CalorieRoute = () => <View style={globalStyles.container}><CalorieInputScreen /></View>;

class LandingScreen extends React.Component {
  constructor (props) {
    super(props);
    // Default settings, add support for user settings
    this.state = {
      calories: 2000,
      protein: .33,
      fat: .33,
      carb: .34,
      calorieMode: true,
      index: 0,
      routes: [
        { key: '1', title: 'Macro Input' },
        { key: '2', title: 'Calorie Input' },
      ],
    };
  }

  _handleChangeTab = index => { 
    this.setState({ index });
  };
  _renderHeader = props => {
    return (
      <TabBar 
        {...props}
      />
    );
  };
  _renderFooter = props => {
    return (
      <Button title='Generate' onPress = {() => this.props.navigation.navigate('Results')}>
      </Button>
    )
  }
  _renderScene = SceneMap({
    '1': MacroRoute,
    '2': CalorieRoute,
  });

  // Use these for optimization (anti-pattern) or nah in touchablehighlights
  // _onPressCal = () => { this.setState({ calorieMode: true }); console.log("cal pressed"); };

  render () {
    return (
      // <View style={ styles.mainNav }>
      //   <View style={ styles.buttonContainer }>
      //     <TouchableHighlight style={ styles.button } onPress={ () => this.setState({ calorieMode: false }) }>
      //       <Text>Input Macros</Text>
      //     </TouchableHighlight>
      //     <TouchableHighlight style={ styles.button } onPress={ () => this.setState({ calorieMode: true }) }>
      //       <Text>Input Calories</Text>
      //     </TouchableHighlight>
      //   </View>
      //   <View style={ styles.contentContainer }>
      //     { this.state.calorieMode ? <CalorieInputScreen /> : <MacroInputScreen /> }
      //   </View>

      //   <View style={ styles.buttonContainer }>
      //     <TouchableHighlight style={ styles.button } onPress = { () => navigate('Results') }>
      //       <Text>Next Screen</Text>
      //     </TouchableHighlight>
      //   </View>
      // </View>
      <TabViewAnimated
        style={ styles.tabViewContainer }
        navigationState={ this.state }
        renderScene={ this._renderScene }
        renderHeader={ this._renderHeader }
        renderFooter={ this._renderFooter }
        onRequestChangeTab={ this._handleChangeTab }
      >
      </TabViewAnimated>
    );
  }
}

const MainNavigation = StackNavigator({
  Landing: { screen: LandingScreen },
  Results: { screen: ResultsScreen },
});

export default class App extends React.Component {
  render() {
    return (
      <MainNavigation />
    );
  }
}

const styles = StyleSheet.create({
  mainNav: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 8,
  },
  tabViewContainer: {
    flex: 9
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
