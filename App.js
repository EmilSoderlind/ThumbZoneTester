import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';

import ButtonRow from './ButtonRow';
import CustomButton from './CustomButton';

export default class App extends React.Component {


  constructor(props) {
    super(props);

    this.getRandomInt = this.getRandomInt.bind(this);
    this.pressedButton = this.pressedButton.bind(this);
    this.doneWithButton = this.doneWithButton.bind(this);

    this.state = { 
      testingRow: 0,
      testingCol: 0,
      numberOfCols: 3,
      numberOfRows: 3,
      startedTest: false,
      resultArray: -1,
      };

  }

  // Creating result array - Setting to -1 when not defined
  componentWillMount(){
    let newResultArr = []
    for(let row = 0; row<this.state.numberOfRows; row++){
      let colArr = []
      for(let col = 0; col<this.state.numberOfCols; col++){
        colArr.push({value: -1}.value)
      }
      newResultArr.push(colArr)
    }

    this.setState({
      resultArray: newResultArr
    })

  }

  setRandomButton(){
    
  }

  startTest(){

    
    this.setRandomButton();



    // Give row callbackFunc + col-index

  }

  // Callback function when button pressed
  pressedButton(row,col,time){
    console.log("pressedButton(r:"+ row + ",c" + col + ",t" + time);
    this.state.resultArray[row][col] = time;

    let randomedRow = -1
    let randomedCol = -1

    let tries = 0
    let didFindUnpressedButton = true

    do{
      tries++

      // Get random button
      randomedRow = this.getRandomInt(this.state.numberOfRows);
      randomedCol = this.getRandomInt(this.state.numberOfCols);

      console.log("trie"+tries+" Randomed -> r" + randomedRow + "|c:" + randomedCol);
      
      
      if(tries > (this.state.numberOfCols*this.state.numberOfRows)){
        console.log("All buttons have been pressed!")
        this.doneWithButton();
        didFindUnpressedButton = false
        break
      }

    } while (this.state.resultArray[randomedRow][randomedCol] != '-1')

    if(didFindUnpressedButton){
      this.setState({
        testingRow: randomedRow,
        testingCol: randomedCol,
      })
    }

  }

  doneWithButton(){
    
    this.setState({
      testingRow: -1,
      testingCol: -1,
    })

    for (let row = 0; row < this.state.numberOfRows; row++) {
      console.log(this.state.resultArray[row])
    }



     // If no button left --> Sammanställ/normera 0-1
     // Sätt färgen på knappar enl heatmat
  }

  
  createRows = () => {

    let nrOfCols = this.state.numberOfCols;
    let nrOfRows = this.state.numberOfRows;

    let testRow = this.state.testingRow;
    let testCol = this.state.testingCol;
    let rows = []

    for (let i = 0; i < nrOfRows; i++) {
      if(i == testRow){
        rows.push(<ButtonRow nrOfCols={nrOfCols} rowNumber={i} columnNumber={testCol} callbackFunc={this.pressedButton} key={i} />)
      }else{
        rows.push(<ButtonRow nrOfCols={nrOfCols} rowNumber={i} columnNumber='-1' callbackFunc={this.pressedButton} key={i} />)
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


  getRandomInt(max) {
    let random = Math.floor(Math.random() * Math.floor(max));
    console.log("max: " + max + " -> random: " + random);
    return random;
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
