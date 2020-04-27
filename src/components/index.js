import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  Platform,
  StyleSheet,
} from 'react-native';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';

import Home from './home';
import Manga from './manga';
import Page from './page';
import Search from './search';
import Result from './result';

class Main extends Component {
  state = {
    isExit: false,
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        if (Actions.state.routes.length !== 1) {
          Actions.pop();
          return true;
        }

        if (!this.state.isExit) {
          this.setState(
            {
              isExit: true,
            },
            () => {
              setTimeout(() => {
                this.setState({isExit: false});
              }, 3000);
            },
          );

          return true;
        }

        BackHandler.exitApp();
        return false;
      });
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', () => {});
    }
  }

  handleSearch = () => {
    Actions.search();
  };

  renderRightButton = () => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.handleSearch}>
        <Image
          style={{width: 30, height: 30, marginRight: 10}}
          source={require('./search.png')}
        />
      </TouchableOpacity>
    );
  };

  renderMessage = () => {
    return <Text style={styles.message}>再按一次退出</Text>;
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Router
          back={true}
          backButtonTintColor="white"
          navigationBarStyle={styles.navBar}
          titleStyle={styles.navTitle}>
          <Stack key="root">
            <Scene
              key="home"
              component={Home}
              title="漫画"
              renderRightButton={this.renderRightButton()}
            />
            <Scene key="search" component={Search} title="搜索" />
            <Scene key="result" component={Result} title="搜索结果" />
            <Scene key="manga" component={Manga} />
            <Scene key="page" component={Page} hideNavBar={true} />
          </Stack>
        </Router>
        {this.state.isExit && this.renderMessage()}
      </View>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  navBar: {
    backgroundColor: '#ec407a',
    color: '#ffffff',
    elevation: 0,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
  },
  message: {
    color: '#ffffff',
    position: 'absolute',
    bottom: 50,
    paddingTop: 8,
    paddingLeft: 13,
    paddingRight: 13,
    paddingBottom: 8,
    borderRadius: 10,
    backgroundColor: '#000000dd',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
