import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {YellowBox} from 'react-native';
import Router from './compontents/index';
import configStore from './store';

const store = configStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);
