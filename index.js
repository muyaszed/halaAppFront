/** @format */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import {DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './app/App';
import {name as appName} from './app.json';

export default function Main() {
    return (
      <PaperProvider theme={DarkTheme}>
        <App />
      </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main); 
