import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {loadManga} from '../actions';

@connect(
  (state, props) => {
    const {list, data} = state.home.manga;

    return {
      list,
      data,
    };
  },
  {
    loadManga,
  },
)
class Home extends Component {
  componentDidMount() {
    this.loadData();
  }

  loadData = (isReset = false) => {
    this.props.loadManga(isReset);
  };

  render() {
    const {list} = this.props;

    return (
      <View>
        <Text onClick={this.loadData}>Hello, world</Text>
        <FlatList
          data={list}
          numColumns={3}
          onEndReached={this.loadData}
          onEndReachedThreshold={0.25}
          style={styles.content}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.contentItem}
              onPress={this.loadData}
              activeOpacity={0.9}>
              <Image style={styles.itemCover} source={require('./1.png')} />
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  content: {
    margin: 5,
  },
  contentItem: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
  },
  itemCover: {
    width: 120,
    height: 150,
    borderRadius: 2,
    resizeMode: 'cover',
  },
  itemTitle: {
    fontWeight: 'bold',
    color: '#3a3a3a',
    width: 120,
    paddingTop: 2,
  },
});

export default Home;
