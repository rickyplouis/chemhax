import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button
} from 'react-native'

export default class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: "Hello from state"
    }
  }

  goToIsonomer(){
    console.log('clicked button');
    this.props.navigation.navigate('Isonomer')
  }

  render(){
    console.log('this.props are', this.props);
    return (
      <View style={styles.container}>
        <Button onPress={() => this.goToIsonomer()} title="Navigate To Isonomer">
          <Text>Here lies all the info for the button</Text>
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
