import React, {Component} from 'react';
import {NativeRouter, Route} from 'react-router-native';

import Home from './home';

class Router extends Component {
  render() {
    return (
      <NativeRouter>
        <Route path="/" component={Home} />
      </NativeRouter>
    );
  }
}

export default Router;
