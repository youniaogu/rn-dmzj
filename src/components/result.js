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

@connect(state => {
  const {lists, search} = state;
  const {list} = search;

  return {
    list,
    lists,
  };
})
class Result extends Component {
  redirctTo = (key, params) => {
    return function() {
      Actions[key](params);
    };
  };

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.contentItem}
        onPress={this.redirctTo('manga', {id: item.id})}>
        <Image
          style={styles.itemCover}
          source={{
            uri: 'https://images.dmzj.com/' + item.cover,
            headers: {
              referer: 'https://m.dmzj.com',
            },
          }}
        />
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
  itemTitle: {
    fontWeight: 'bold',
    color: '#3a3a3a',
    paddingTop: 3,
    width: getSize({nub: 3, sub: 40}),
  },
});

export default Result;
