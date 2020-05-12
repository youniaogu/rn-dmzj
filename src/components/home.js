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
import {handlePickerInput, loadRecommendList} from '../actions';
import RNPickerSelect from 'react-native-picker-select';

const typeLabels = [
  {label: '冒险', value: 1},
  {label: '欢乐向', value: 2},
  {label: '格斗', value: 3},
  {label: '科幻', value: 4},
  {label: '爱情', value: 5},
  {label: '竞技', value: 6},
  {label: '魔法', value: 7},
  {label: '校园', value: 8},
  {label: '悬疑', value: 9},
  {label: '恐怖', value: 10},
  {label: '生活亲情', value: 11},
  {label: '百合', value: 12},
  {label: '伪娘', value: 13},
  {label: '耽美', value: 14},
  {label: '后宫', value: 15},
  {label: '萌系', value: 16},
  {label: '治愈', value: 17},
  {label: '武侠', value: 18},
  {label: '职场', value: 19},
  {label: '奇幻', value: 20},
  {label: '节操', value: 21},
  {label: '轻小说', value: 22},
  {label: '搞笑', value: 23},
];
const statusLabels = [
  {label: '连载', value: 1},
  {label: '完结', value: 2},
];

@connect(
  state => {
    const {recommendList, lists} = state;
    const {type, status, sort, list, loadStatus} = recommendList;

    return {
      type,
      status,
      sort,
      list,
      lists,
      loadStatus,
    };
  },
  {
    handlePickerInput,
    loadRecommendList,
  },
)
class Home extends Component {
  componentDidMount() {
    this.props.loadRecommendList();
  }

  loadMore = () => {
    this.props.loadRecommendList();
  };

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

  handlePick = name => {
    return value => {
      this.props.handlePickerInput({name, value});
    };
  };
  handleSort = value => {
    return () => {
      this.props.handlePickerInput({name: 'sort', value});
    };
  };
  handleSearch = () => {
    this.props.loadRecommendList(true);
  };

  renderEmpty = () => {
    return <React.Fragment />;
  };

  render() {
    const {type, status, sort, loadStatus, list, lists} = this.props;

    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <RNPickerSelect
            style={picker}
            value={type}
            placeholder={{
              label: '全部',
              value: 0,
            }}
            Icon={this.renderEmpty}
            useNativeAndroidPickerStyle={false}
            onValueChange={this.handlePick('type')}
            items={typeLabels}
          />
          <RNPickerSelect
            style={picker}
            value={status}
            placeholder={{
              label: '全部',
              value: 0,
            }}
            Icon={this.renderEmpty}
            useNativeAndroidPickerStyle={false}
            onValueChange={this.handlePick('status')}
            items={statusLabels}
          />

          <TouchableOpacity
            style={styles.btn}
            activeOpacity={1}
            onPress={this.handleSort(0)}>
            <Text style={sort === 0 ? styles.sort_active : styles.sort}>
              人气↓
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={1}
            onPress={this.handleSort(1)}>
            <Text style={sort === 1 ? styles.sort_active : styles.sort}>
              更新↓
            </Text>
          </TouchableOpacity>

          <View style={styles.spaces} />

          <TouchableOpacity
            style={styles.btn}
            activeOpacity={1}
            onPress={this.handleSearch}>
            <Text style={styles.search}>
              {loadStatus === 1 ? '...' : '筛选'}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={list.map(id => lists[id])}
          numColumns={3}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.25}
          style={styles.content}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  header: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#ffffff',
  },
  spaces: {
    flex: 1,
  },
  sort: {
    height: 26,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#efb5c9',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingTop: 4,
    paddingLeft: 9,
    paddingRight: 7,
    paddingBottom: 4,
    textAlign: 'center',
  },
  sort_active: {
    height: 26,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#ec407a',
    borderRadius: 4,
    paddingTop: 4,
    paddingLeft: 9,
    paddingRight: 7,
    paddingBottom: 4,
    textAlign: 'center',
  },
  search: {
    width: 40,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#ec407a',
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: 'center',
  },
  content: {
    marginTop: 41,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
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

const picker = StyleSheet.create({
  inputAndroid: {
    width: 75,
    height: 26,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 4,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 4,
    marginRight: 10,

    color: '#ffffff',
    backgroundColor: '#ec407a',
    borderRadius: 4,
  },
  placeholder: {
    color: '#ffffff',
  },
});

export default Home;
