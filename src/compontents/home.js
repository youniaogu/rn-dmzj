import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Link} from 'react-router-native';
import {connect} from 'react-redux';
import {loadMangaList} from '../actions';

@connect(
  (state, props) => {
    const {mangaList, lists, webpic} = state.home;
    const {list, data} = mangaList;

    return {
      list,
      lists,
      data,
      webpic,
    };
  },
  {
    loadMangaList,
  },
)
class Home extends Component {
  componentDidMount() {
    this.loadData();
  }

  loadData = (isReset = false) => {
    this.props.loadMangaList(isReset);
  };

  loadImg = cover => {
    this.props.getImgBase64(cover);
  };

  renderItem = ({item}) => {
    const {webpic} = this.props;

    return (
      <Link underlayColor="#f0f4f7" to={`/manga/${item.id}`}>
        <View style={styles.contentItem}>
          <Image
            style={styles.itemCover}
            source={{
              uri: 'data:image/png;base64,' + webpic[item.cover],
            }}
          />
          <Text style={styles.itemTitle} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      </Link>
    );
  };

  render() {
    const {list, lists} = this.props;

    return (
      <View style={styles.wrapper}>
        <Text onClick={this.loadData}>Hello, world</Text>

        <FlatList
          data={list.map(id => lists[id])}
          numColumns={3}
          onEndReached={this.loadData}
          onEndReachedThreshold={0.25}
          style={styles.content}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

function getWidth(nub = 1, sub = 0) {
  return (Dimensions.get('screen').width - sub) / nub;
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
  },
  content: {},
  contentItem: {
    flex: 1,
    padding: 5,
  },
  itemCover: {
    width: getWidth(3, 40),
    height: getWidth(3, 40) * 1.25,
    borderRadius: 2,
    resizeMode: 'cover',
  },
  itemTitle: {
    fontWeight: 'bold',
    color: '#3a3a3a',
    paddingTop: 3,
    width: getWidth(3, 40),
  },
});

export default Home;
