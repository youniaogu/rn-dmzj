import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {loadMangaPage} from '../actions';
import {getSize} from './util';
import FitImage from './fitImage';

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

  renderEmpty = () => {
    const {loadStatus} = this.props.page || {};

    return (
      <Text style={styles.text}>
        {loadStatus === 1 ? '加载中' : '内容为空!'}
      </Text>
    );
  };

  render() {
    const {name = '', urls = []} = this.props.page || {};

    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.text}>{name}</Text>
        </View>
        <View style={styles.scroll}>
          <FlatList
            // ListHeaderComponent={() => {
            //   return (
            //     <Button
            //       title="scroll"
            //       onPress={() => {
            //         this.flatList.current.scrollToIndex({
            //           index: 1,
            //           animated: true,
            //         });
            //       }}
            //     />
            //   );
            // }}
            // ref={this.flatList}
            data={urls}
            horizontal={true}
            initialNumToRender={1}
            renderItem={FitImage}
            keyExtractor={item => item.url}
            ListEmptyComponent={this.renderEmpty}
          />
        </View>
      </View>
    );
  }
}

export default Page;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#000000',
    height: getSize({type: 'height'}),
  },
  header: {
    height: 20,
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
  },
  scroll: {
    flex: 1,
    width: getSize(),
    height: getSize({type: 'height', sub: 40}),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  pic: {
    width: getSize(),
    height: getSize({type: 'height', sub: 40}),
  },
});
