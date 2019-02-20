import React, { Component } from 'react';
import NavigationService from '../NavigationService';

import AppContainer from './config/routes';

export default class App extends Component {
  render() {
    return (
      <AppContainer
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
