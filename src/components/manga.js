import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {loadMangaChapter} from '../actions';
import {getSize} from './util';

@connect(
  (state, props) => {
    const {lists} = state;
    const {id} = props;

    return {
      data: lists[id],
      id,
    };
  },
  {loadMangaChapter},
)
class Manga extends Component {
  componentDidMount() {
    const {id, data, loadMangaChapter} = this.props;

    loadMangaChapter(id, data.comic_py);
  }

  renderAssort = ({item}) => {
    return (
      <View key={item.title}>
        <Text style={styles.title}>{item.title}</Text>

        <FlatList
          data={item.data}
          numColumns={3}
          renderItem={this.renderChapter}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  renderChapter = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.redirctTo('page', {
          id: item.id,
          cid: item.comic_id,
        })}>
        <Text style={styles.chapter} numberOfLines={1}>
          {item.chapter_name}
        </Text>
      </TouchableOpacity>
    );
  };

  redirctTo = (key, params) => {
    return function() {
      Actions[key](params);
    };
  };

  render() {
    const {data} = this.props;
    const {name, authors, status, cover, chapter = []} = data;

    return (
      <ScrollView style={styles.wrapper}>
        <View style={styles.header}>
          <Image
            style={styles.cover}
            source={{
              uri: 'https://images.dmzj.com/' + cover,
              headers: {
                referer: 'https://m.dmzj.com',
              },
            }}
          />
          <View style={styles.intro}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.authors} numberOfLines={1}>
              {authors}
            </Text>
            <Text style={styles.status} numberOfLines={1}>
              {status}
            </Text>
          </View>
        </View>

        <View style={styles.scroll}>
          <FlatList
            data={chapter}
            numColumns={1}
            renderItem={this.renderAssort}
            keyExtractor={item => item.title}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  header: {
    backgroundColor: '#ec407a',
    padding: 10,
    flexDirection: 'row',
  },
  cover: {
    width: 100,
    height: 130,
  },
  intro: {
    flex: 1,
    marginLeft: 10,
    paddingTop: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingBottom: 5,
  },
  authors: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingBottom: 3,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  scroll: {},
  title: {
    fontSize: 14,
    color: '#717171',
    marginLeft: 18,
    marginTop: 15,
  },
  chapter: {
    width: getSize({select: 'screen', nub: 3, sub: 90}),
    textAlign: 'center',
    fontSize: 14,
    margin: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 30,
    borderWidth: 1,
    color: '#717171',
    borderColor: '#717171',
    textAlign: 'center',
  },
});

export default Manga;
