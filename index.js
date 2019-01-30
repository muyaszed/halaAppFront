/** @format */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import {DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './app/App';
import {name as appName} from './app.json';
import { Provider as StoreProvider } from 'react-redux';

import configureStore from './store';

const store = configureStore();

export default function Main() {
    return (
      <StoreProvider store={store}>
        <PaperProvider>
          <App />
        </PaperProvider>
      </StoreProvider>
      
    );
  }

AppRegistry.registerComponent(appName, () => Main); 
