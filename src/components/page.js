import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {loadMangaPage} from '../actions';
import FitImage from 'react-native-fit-image';

@connect(
  (state, props) => {
    const {page} = state;
    const {id, cid} = props;

    return {
      page: page[id],
      id,
      cid,
    };
  },
  {loadMangaPage},
)
class Page extends Component {
  componentDidMount() {
    const {id, cid, page, loadStatus, loadMangaPage} = this.props;

    if (typeof page === 'undefined' && loadStatus !== 1) {
      loadMangaPage(id, cid);
    }
  }

  renderItem = ({item}) => (
    <FitImage
      style={styles.pic}
      indicatorColor="white"
      indicatorSize="large"
      resizeMode="contain"
      source={{
        uri: item,
        headers: {
          referer: 'https://m.dmzj.com',
        },
      }}
    />
  );

  render() {
    const {name = '', urls = [], loadStatus} = this.props.page || {};

    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.text}>{name}</Text>
        </View>
        <View style={styles.scroll}>
          <FlatList
            data={urls}
            horizontal={true}
            initialNumToRender={5}
            renderItem={this.renderItem}
            keyExtractor={url => url}
            ListEmptyComponent={() => {
              return (
                <View>
                  <Text style={styles.text}>
                    {loadStatus === 1 ? '加载中' : '内容为空!'}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

export default Page;

function getSize(type, nub = 1, sub = 0) {
  return (Dimensions.get('window')[type] - sub) / nub;
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#000000',
    height: getSize('height'),
  },
  header: {
    height: 20,
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
  },
  scroll: {
    width: getSize('width'),
    height: getSize('height', 1, 40),
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  pic: {
    width: getSize('width'),
    height: getSize('height', 1, 40),
  },
});
