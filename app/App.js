import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import NavigationService from '../NavigationService';


import AppContainer from './config/routes';

class App extends Component {

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



export default App;

