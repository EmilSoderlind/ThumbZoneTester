import React from 'react';
import { TouchableHighlight, Alert, StyleSheet, Text, View, Button, Dimensions, Vibration } from 'react-native';


export default class CustomButton extends React.Component {

    constructor(props) {
        super(props);
        this._onPressButton = this._onPressButton.bind(this);
        this._startTest = this._startTest.bind(this);
        this._stopTest = this._stopTest.bind(this);
        this.heatMapColorforValue = this.heatMapColorforValue.bind(this)

        this.state = {
            testStarted: false,
            startTime: -1,
            elapsedTime: NaN,
        };
    }

    // Called when button Appeares and wait for user to click, sets startTime
    _startTest(){
        //console.log("(" + this.props.rowNumber + "," + this.props.columnNumber+")_startTest()");
        this.state.startTime = Date.now();
        this.state.testStarted = true;
    }

    _stopTest(){
        //console.log("(" + this.props.rowNumber + "," + this.props.columnNumber + ")_stopTest()");
        this.state.testStarted = false;

        let str = "Time elapsed: " + (new Date() - this.state.startTime);
        this.state.elapsedTime = (new Date() - this.state.startTime);
        
        //Alert.alert(str);
        
        this.props.callbackFunc(this.props.rowNumber,this.props.columnNumber,this.state.elapsedTime);
        // Callback!
    }

    _onPressButton(){
        if (this.props.isCounting == 'true'){
            Vibration.vibrate(500)
            this._stopTest();
        }
    }

    heatMapColorforValue(value) {
        var h = (1.0 - value) * 240
        return "hsl(" + h + ", 100%, 50%)";
    }

    render() {
        if (this.props.doneWithTest && !isNaN(this.props.highestResult) && !isNaN(this.props.lowestResult)){

            let maxMmin = this.props.highestResult - this.props.lowestResult
            let valMmin = this.state.elapsedTime - this.props.lowestResult
            let normalizedElapsed = valMmin / maxMmin

            color = this.heatMapColorforValue(normalizedElapsed)
            
            if (color == 'hsl(NaN, 100%, 50%)') { // Bug that heatMapColorforValue return null
                color = 'rgb(255, 255, 255)'
            }

            return ( // Knapp av med resultat!
                <TouchableHighlight onPress={this._onPressButton} underlayColor="black" style={[styles.buttonOff, {backgroundColor: color}]}>
                    <Text style={styles.textStajl}></Text>
                </TouchableHighlight>
            )
            
        }else if (this.props.isCounting != 'true'){
            this._startTest()
            return ( // Knapp av
                <TouchableHighlight onPress={this._onPressButton} underlayColor="black" style={styles.buttonOff}>
                    <Text style={styles.textStajl}></Text>
                </TouchableHighlight>
            )
        } else if (this.state.testStarted){
            return ( // Knapp på
                <TouchableHighlight onPress={this._onPressButton} underlayColor="black" style={styles.button}>
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
       justifyContent: 'center',
       alignItems: 'center'
   },
   textStajl: {
       color: 'blue',
       fontWeight: 'bold',
       textAlign: 'center',
       fontSize: 20,
   }
}); 

