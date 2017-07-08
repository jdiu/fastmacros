import React from 'react';
import { 
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import { globalStyles } from '../globalstyles.js';

export class MacroInputScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        inputProtein: '0',
        inputCarbs: '0',
        inputFats: '0'
    };
  }

  render() {
    return(
        <KeyboardAvoidingView style={ styles.inputWrapper } behavior="padding">
            <Text>This is the macro screen</Text>
            
                <TextInput 
                    style = {styles.numericInput}
                    keyboardType = 'numeric'
                    onChangeText = {(text)=> this.onChanged(text, 'inputProtein')}
                    value = {this.state.inputProtein}
                    maxLength = {4}  //setting limit of input
                />
                <TextInput 
                    style = {styles.numericInput}
                    keyboardType = 'numeric'
                    onChangeText = {(text)=> this.onChanged(text, 'inputCarbs')}
                    value = {this.state.inputCarbs}
                    maxLength = {4}  //setting limit of input
                />
                <TextInput 
                    style = {styles.numericInput}
                    keyboardType = 'numeric'
                    onChangeText = {(text)=> this.onChanged(text, 'inputFats')}
                    value = {this.state.inputFats}
                    maxLength = {4}  //setting limit of input
                />
        </KeyboardAvoidingView>
    );
  }

  onChanged (text, stateVar) {
    var reg = new RegExp("^[0-9]+$");
    if(!reg.test(text)){
        //set flag for error
        text = '';
    };
    
    var obj = {};
    obj[stateVar] = text;

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
    numericInput: {
        width: 100,
        padding: 5,
    },
    inputWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});