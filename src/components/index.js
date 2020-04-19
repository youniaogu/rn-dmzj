import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Home from './home';
import Manga from './manga';

class Main extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="home" component={Home} title="首页" />
          <Scene key="manga" component={Manga} />
        </Stack>
      </Router>
    );
  }
}

export default Main;
