import React, {Component} from 'react';
import {View} from 'react-native';
import {NativeRouter, Switch, Route} from 'react-router-native';

import Home from './home';
import Manga from './manga';

class Router extends Component {
  render() {
    return (
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/manga/:id" component={Manga} />
        </Switch>
      </NativeRouter>
    );
  }
}

export default Router;
