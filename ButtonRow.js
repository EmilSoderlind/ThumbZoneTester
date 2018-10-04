import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';

import CustomButton from './CustomButton';

export default class ButtonRow extends React.Component {

    createCols = () => {

        let cols = []

        for (let i = 0; i < this.props.nrOfCols; i++) {
            if (i == this.props.columnNumber) {
                cols.push(<CustomButton rowNumber={this.props.rowNumber} columnNumber={i} isCounting='true' key={i}/>)
            } else {
                cols.push(<CustomButton rowNumber={this.props.rowNumber} columnNumber={i} key={i} />)
            }
        }

        return cols;
    }

    render() {
        return (
            <View style={styles.buttonRow} >
                {this.createCols()}
            </View>
        )
    }

}

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    buttonRow: {
        flex: 1, 
        flexDirection: 'row' 
    }
});

