import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import CardComponent from '../components/CardComponent'

export default class IsonomerScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: "Hello from state"
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <CardComponent/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
