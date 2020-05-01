import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {getSize} from './util';
import {init} from '../actions';

@connect(
  state => {
    const {collection, lists, progress} = state;
    const {list} = collection;

    return {
      list,
      lists,
      progress,
    };
  },
  {init},
)
class Collection extends Component {
  componentDidMount() {
    this.props.init();
  }

  redirctTo = (key, params) => {
    return function() {
      Actions[key](params);
    };
  };

  renderItem = ({item}) => {
    const {progress} = this.props;
    const data = progress[item.id] || {};

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.contentItem}
        onPress={this.redirctTo('manga', {id: item.id})}>
        <View style={styles.imgWrapper}>
          <Image
            style={styles.itemCover}
            source={{
              uri: 'https://images.dmzj.com/' + item.cover,
              headers: {
                referer: 'https://m.dmzj.com',
              },
            }}
          />
          {data.label && (
            <Text style={styles.itemLabel} numberOfLines={1}>
              {data.label}
            </Text>
          )}
        </View>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {list, lists} = this.props;

    return (
      <FlatList
        data={list.map(id => lists[id])}
        numColumns={3}
        style={styles.content}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
    );
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 5,
  },
  contentItem: {
    padding: 5,
  },
  itemCover: {
    width: getSize({nub: 3, sub: 40}),
    height: getSize({nub: 3, sub: 40}) * 1.25,
    borderRadius: 2,
    resizeMode: 'cover',
  },
  imgWrapper: {
    position: 'relative',
  },
  itemLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    width: getSize({nub: 3, sub: 40}),
    color: '#ffffff',
    backgroundColor: '#dfdfdfdd',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  itemTitle: {
    fontWeight: 'bold',
    color: '#3a3a3a',
    paddingTop: 3,
    width: getSize({nub: 3, sub: 40}),
  },
});

export default Collection;
