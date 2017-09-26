import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

import {Container, Content, Card, CardItem, Left, Body, Text, Icon, Image, Button, Right} from 'native-base'
//REDUX IMPORTS
import { connect } from 'react-redux';
import { setIsonomers } from '../actions/isonomerActions'


class IsonomerScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: "Hello from state"
    }
  }

  renderCards = () =>{
    var index = 0;
    const isonomerCards = this.props.isonomers.map( (isonomer) =>
      <Card style={{flex: 0}} key={index++}>
        <CardItem header>
          <Text>{isonomer.object.MolecularFormula}</Text>
        </CardItem>
        <CardItem>
          <Left>
            <Body>
              <Text>{isonomer.object.CID}</Text>
              <Text>{isonomer.object.IUPACName}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent textStyle={{color: '#87838B'}}>
              <Text>{isonomer.object.MolecularWeight} Molecular Weight</Text>
            </Button>
          </Left>
          <Right>
            <Button transparent textStyle={{color: 'red'}}>
              <Text>{isonomer.object.InChIKey}</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    )
    return (
      <Content>
        {isonomerCards}
      </Content>
    )
  }

  render(){
    console.log('props on render are', this.props.isonomers);
    return (
      <Container>
        {this.renderCards()}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

function mapStateToProps (state) {
  return {
    isonomers: state.isonomers.isonomers,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchSetIsonomers: (isonomers) => dispatch(setIsonomers(isonomers))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IsonomerScreen)
