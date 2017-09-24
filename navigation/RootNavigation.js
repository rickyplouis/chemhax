import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen'
import IsonomerScreen from '../screens/IsonomerScreen'

const RootStackNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Isonomer: {
      screen: IsonomerScreen
    }
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  }

}
