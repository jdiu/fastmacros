import React from 'react';
import { 
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import { globalStyles } from '../globalstyles.js';
import NumericInputWrapper from './NumericInputWrapper';

export class MacroInputScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        inputProtein: '',
        inputCarbs: '',
        inputFats: ''
    };
  }

  render() {
    return(
        <KeyboardAvoidingView style={ globalStyles.container } behavior="padding">
            <NumericInputWrapper 
                label="Protein"
                value={this.state.inputProtein}
                onChangedCallback={this.onChanged}
                stateVar='inputProtein' />
        </KeyboardAvoidingView>
    );
  }

  onChanged (obj) {
    this.setState(obj);
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

const styles = StyleSheet.create({
    
});