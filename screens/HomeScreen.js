import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput
} from 'react-native'

import { StackNavigator } from 'react-navigation'

import { Button } from 'native-base'
//REDUX IMPORTS
import { connect } from 'react-redux';
import { setIsonomers } from '../actions/isonomerActions'

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: "Hello from state",
      formula: ""
    }
  }

  handleClick(){
    getIsonomer().then( (objectArray) => {
      setIsonomers(objectArray).then( () => {
        goToIsonomer();
      })
    })
  }

  setIsonomers(objectArray){
    for (let object of objectArray){
      console.log('dispatching', object);
      this.props.dispatchSetIsonomers({object})
    }
  }

  goToIsonomer(){
    this.props.navigation.navigate('Isonomer')
  }


  getIsonomer(){
    var input = this.state.formula
    return new Promise(function(resolve, reject) {

      var getOptions = {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }

      fetch('https://chemhaxapi-nhbbykdgal.now.sh/api/compounds?formula=' + input, getOptions).then( (response) => {
        if (response.status == 200){
          var cidList = response._bodyText
          console.log('raw cidList', cidList);
          fetch('https://chemhaxapi-nhbbykdgal.now.sh/api/compounds?cid=' + cidList, getOptions).then( (response) => {
            if (response.status == 200){
              var begin = response._bodyText.indexOf('[') + 1;
              var end = response._bodyText.indexOf(']')
              var jsonArray = response._bodyText.substring(begin, end)
              var parsedJSON = [];
              var jStart = 0
              var jEnd;
              for (let x = 0, len = jsonArray.length; x < len; x++){
                if (jsonArray[x] == '{'){
                  jStart = x
                }
                if (jsonArray[x] == '}'){
                  jEnd = x + 1
                  var chunk = jsonArray.substring(jStart, jEnd);
                  parsedJSON.push(JSON.parse(chunk));
                }
              }
              resolve(parsedJSON)
              console.log('parsedJSON is', parsedJSON);
            } else {
              console.log('failed');
              resolve([])
            }
          });
        } else {
          console.log('failed');
          resolve([])
        }
      });
    })
  }


  render(){
    console.log('this.props are', this.props);
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(formula) => this.setState({formula})}
          placeholder="Example: HBr"
          value={this.state.formula}
        />
      <Button block onPress={ () => {
          Promise.all([
            this.getIsonomer().then( (array) => {
              this.setIsonomers(array)
            })
          ]).then( () => {
            this.goToIsonomer()
            })
          }}
              title="Navigate To Isonomer">
          <Text>Submit</Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const App = StackNavigator({
  Home: {
    screen: HomeScreen
  }
})

function mapStateToProps (state) {
  return {
    isonomers: state.isonomers.isonomers,
  }
}


function mapDispatchToProps (dispatch) {
  return {
    dispatchSetIsonomers: (isonomers) => dispatch(setIsonomers(isonomers)),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
