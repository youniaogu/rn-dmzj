import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {loadMangaPage} from '../actions';

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
    const {id, cid, page, loadMangaPage} = this.props;

    if (typeof page === 'undefined') {
      loadMangaPage(id, cid);
    }
  }

  render() {
    const {name = '', url = []} = this.props.page || {};

    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>{name}</Text>
        <FlatList
          data={url}
          horizontal={true}
          initialNumToRender={2}
          renderItem={({item}) => (
            <View>
              <Text style={{color: 'white'}}>{item}</Text>
            </View>
          )}
          keyExtractor={url => url}
        />
      </View>
    );
  }
}

export default Page;

function getSize(type, nub = 1, sub = 0) {
  return (Dimensions.get('screen')[type] - sub) / nub;
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#000000',
    height: getSize('height'),
  },
  title: {
    color: '#ffffff',
  },
});
