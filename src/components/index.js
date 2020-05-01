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
import {Router, Stack, Scene, Tabs, Actions} from 'react-native-router-flux';

import Home from './home';
import Manga from './manga';
import Page from './page';
import Search from './search';
import Result from './result';
import Collection from './collection';

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

  renderLeftButton = () => {
    return (
      <Image
        style={{width: 30, height: 30, marginLeft: 15}}
        source={require('../assets/home.png')}
      />
    );
  };
  renderRightButton = () => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.handleSearch}>
        <Image
          style={{width: 30, height: 30, marginRight: 10}}
          source={require('../assets/search.png')}
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
          init={true}
          backButtonTintColor="white"
          navigationBarStyle={styles.navBar}
          titleStyle={styles.navTitle}>
          <Stack key="root">
            <Tabs
              title="漫画"
              wrap={false}
              activeTintColor="#ffffff"
              inactiveTintColor="#ffffff"
              tabBarPosition="top"
              labelStyle={styles.label}
              tabBarStyle={styles.tabBar}
              indicatorStyle={styles.indicator}
              renderLeftButton={this.renderLeftButton()}
              renderRightButton={this.renderRightButton()}>
              <Scene
                tabs={true}
                title="收藏"
                key="collection"
                component={Collection}
              />
              <Scene tabs={true} title="推荐" key="home" component={Home} />
            </Tabs>
            <Scene back={true} key="search" component={Search} title="搜索" />
            <Scene
              back={true}
              key="result"
              component={Result}
              title="搜索结果"
            />
            <Scene back={true} key="manga" component={Manga} />
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
  },
  tabBar: {
    backgroundColor: '#ec407a',
    elevation: 0,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  indicator: {
    backgroundColor: '#ffffff',
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
