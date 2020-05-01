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
import {loadMangaChapter, collect, setProgress} from '../actions';
import {getSize} from './util';

@connect(
  (state, props) => {
    const {lists, collection, progress} = state;
    const {id} = props;
    const isCollect = collection.list.indexOf(id) !== -1;

    return {
      data: lists[id],
      progress: progress[id] || {},
      isCollect,
      id,
    };
  },
  {loadMangaChapter, collect, setProgress},
)
class Manga extends Component {
  componentDidMount() {
    const {id, data, loadMangaChapter} = this.props;

    loadMangaChapter(id, data.comic_py);
  }

  handleCollect = () => {
    const {id, collect} = this.props;

    collect(id);
  };

  redirctTo = (key, params) => {
    const {progress} = this.props;

    return () => {
      if (progress.id !== params.id) {
        this.props.setProgress({...params, index: 0});
      }

      Actions[key]({id: params.id, cid: params.cid});
    };
  };

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
    const {progress} = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.redirctTo('page', {
          id: item.id,
          cid: item.comic_id,
          label: item.chapter_name,
          name: item.name,
        })}>
        <Text
          style={
            item.id === progress.id ? styles.chapter_active : styles.chapter
          }
          numberOfLines={1}>
          {item.chapter_name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {data, isCollect} = this.props;
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
            <Text style={styles.name} numberOfLines={2}>
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

        <TouchableOpacity
          style={styles.btn}
          activeOpacity={1}
          onPress={this.handleCollect}>
          {isCollect ? (
            <Image
              style={{width: 28, height: 28}}
              source={require('../assets/heart-full.png')}
            />
          ) : (
            <Image
              style={{width: 28, height: 28}}
              source={require('../assets/heart-empty.png')}
            />
          )}
        </TouchableOpacity>

        {chapter.length > 0 ? (
          <FlatList
            data={chapter}
            numColumns={1}
            renderItem={this.renderAssort}
            keyExtractor={item => item.title}
          />
        ) : (
          <View style={styles.emptyView}>
            <Text style={styles.emptyText}> 加载中...</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  header: {
    backgroundColor: '#ec407a',
    height: 150,
    padding: 10,
    flexDirection: 'row',
    position: 'relative',
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
  btn: {
    position: 'absolute',
    right: 12,
    top: 122,
    width: 56,
    height: 56,
    backgroundColor: '#ec407a',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },

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
  chapter_active: {
    width: getSize({select: 'screen', nub: 3, sub: 90}),
    textAlign: 'center',
    fontSize: 14,
    margin: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 30,
    color: '#ffffff',
    backgroundColor: '#ec407a',
    textAlign: 'center',
  },

  emptyView: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#717171',
    fontSize: 16,
  },
});

export default Manga;
