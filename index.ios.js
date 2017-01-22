import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { createRouter, NavigationProvider, StackNavigation } from '@exponent/ex-navigation';
import  Router from './Router';


export default class CancerTrialApp extends Component {
  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('home')} />
      </NavigationProvider>
    );
  }
}


AppRegistry.registerComponent('CancerTrialApp', () => CancerTrialApp);
