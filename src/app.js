import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {YellowBox, BackHandler} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Router from './components/index';
import configStore from './store';

const store = configStore();

class App extends Component {
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', function() {
        if (Actions.state.routes.length !== 0) {
          Actions.pop();
          return true;
        }

        return false;
      });
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', () => {});
    }
  }

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
