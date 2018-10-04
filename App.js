import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';

import ButtonRow from './ButtonRow';
import CustomButton from './CustomButton';


export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = { 
      testingRow: 0,
      testingCol: 0,
      numberOfCols: 1,
      numberOfRows: 60,
    };

    // Toggle the state every second
    setInterval(() => {
      this.setState(previousState => {

        if (previousState.testingRow == this.state.numberOfRows - 1 && previousState.testingCol == this.state.numberOfCols-1){
          return { testingRow: 0, testingCol: 0 };
        } else if (previousState.testingRow == this.state.numberOfRows - 1){
          return { testingRow: 0, testingCol: previousState.testingCol+1};
        }else{
          return { testingRow: previousState.testingRow+1};
        }

      
      });
    }, 7);
  }

  
  createRows = () => {

    let nrOfCols = this.state.numberOfCols;
    let nrOfRows = this.state.numberOfRows;

    let testRow = this.state.testingRow;
    let testCol = this.state.testingCol;
    let rows = []

    for (let i = 0; i < nrOfRows; i++) {
      if(i == testRow){
        rows.push(<ButtonRow nrOfCols={nrOfCols} rowNumber={i} columnNumber={testCol} key={i} />)
      }else{
        rows.push(<ButtonRow nrOfCols={nrOfCols} rowNumber={i} columnNumber='-1' key={i} />)
      }
    }
    return rows;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: 'black', height:30 }} />
        {this.createRows()}
        <View style={{ backgroundColor: 'black', height: 30 }} />
      </View>        
    )
  }

}

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(0,0,0)',
  },
});
