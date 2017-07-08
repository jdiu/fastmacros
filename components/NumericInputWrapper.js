import React from 'react';
import { 
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import { globalStyles } from '../globalstyles.js';

export default class NumericInputWrapper extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            label: props.label,
            value: props.value,
            stateVar: props.stateVar,
            onChangedCallback: props.onChangedCallback
        }
    }

    render () {
        return (
            <View style={ styles.inputWrapper }>
                <Text>{this.state.label}</Text>
                <TextInput
                    style = {styles.numericInput}
                    keyboardType = 'numeric'
                    onChangeText = {(text)=> this.onChanged(text)}
                    value = {this.state.value}
                    maxLength = {4}
                />
            </View>
        );
    }

    onChanged (text) {
        var reg = new RegExp("^[0-9]+$");
        if(!reg.test(text)){
            //TODO: set flag for error
            text = '';
        };
        
        var obj = {};
        obj[this.state.stateVar] = text;

        this.props.onChangedCallback(obj);
    }
}

const styles = StyleSheet.create({
    numericInput: {
        width: 100,
        padding: 5,
    },
    inputWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});