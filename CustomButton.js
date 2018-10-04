import React from 'react';
import { TouchableHighlight, Alert, StyleSheet, Text, View, Button, Dimensions } from 'react-native';


export default class CustomButton extends React.Component {

    constructor(props) {
        super(props);
        this._onPressButton = this._onPressButton.bind(this);
    }

    _onPressButton(){
        if (this.props.isCounting == 'true'){
            Alert.alert('You pressed!');
        }
    }

    render() {
        if (this.props.isCounting == 'true'){
            return (
                <TouchableHighlight onPress={this._onPressButton} underlayColor="black" style={styles.button}>
                    <Text style={styles.textStajl}></Text>
                </TouchableHighlight>
            )
        }else{
            return (
                <TouchableHighlight onPress={this._onPressButton} underlayColor="black" style={styles.buttonOff}>
                    <Text style={styles.textStajl}></Text>
                </TouchableHighlight>
            )
        }
    }
}

const styles = StyleSheet.create({
   button: {
       flex: 1,
       backgroundColor: 'yellow',
       justifyContent: 'center',
       alignItems: 'center'
   },
   buttonOff: {
       flex: 1,
       backgroundColor: 'black',
       justifyContent: 'center',
       alignItems: 'center'
   },
   textStajl: {
       fontWeight: 'bold',
       textAlign: 'center',
       fontSize: 20,
   }
}); 

