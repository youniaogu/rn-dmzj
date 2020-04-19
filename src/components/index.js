import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Home from './home';
import Manga from './manga';
import Page from './page';

class Main extends Component {
  render() {
    return (
      <Router
        back={true}
        backButtonTintColor="white"
        navigationBarStyle={styles.navBar}
        titleStyle={styles.navTitle}>
        <Stack key="root">
          <Scene key="home" component={Home} title="推荐" />
          <Scene key="manga" component={Manga} title="漫画" />
          <Scene key="page" component={Page} hideNavBar={true} />
        </Stack>
      </Router>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#ec407a',
    color: '#ffffff',
    elevation: 0,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 3,
  },
});
