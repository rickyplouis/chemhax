import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput
} from 'react-native'

import { Button } from 'native-base'

export default class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: "Hello from state",
      formula: ""
    }
  }

  getIsonomer = () => {
    console.log('getting Isonomer with formula', this.state.formula);
    var getOptions = {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    fetch('https://chemhaxapi-nhbbykdgal.now.sh/api/compounds?formula=' + this.state.formula, getOptions).then( (response) => {
      return new Promise(function(resolve, reject) {
        if (response.status == 200){
          console.log('res is', response);
        } else {
          console.log('failed');
          resolve([])
        }
      });
    })
  }

  goToIsonomer(){
    console.log('clicked button');
    this.props.navigation.navigate('Isonomer')
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
        <Button block onPress={() => this.getIsonomer()} title="Navigate To Isonomer">
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
