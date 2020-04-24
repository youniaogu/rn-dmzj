import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {loadMangaPage} from '../actions';
import {getSize} from './util';
import ImageView from 'react-native-image-view';
import {Actions} from 'react-native-router-flux';

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
  state = {
    isImageViewVisible: false,
  };

  componentDidMount() {
    const {id, cid, page, loadMangaPage} = this.props;

    if (typeof page === 'undefined') {
      loadMangaPage(id, cid);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      if (typeof this.props.page.urls !== 'undefined') {
        this.setState({isImageViewVisible: true});
      }
    }
  }

  componentWillUnmount() {
    this.setState({isImageViewVisible: false});
  }

  renderEmpty = () => {
    const {loadStatus} = this.props.page || {};

    return (
      <Text style={styles.text}>
        {loadStatus === 1 ? '加载中' : '内容为空!'}
      </Text>
    );
  };

  handleClose = () => {
    this.setState({isImageViewVisible: false}, function() {
      Actions.pop();
    });
  };

  render() {
    const {name = '', urls = []} = this.props.page || {};

    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.text}>{name}</Text>
        </View>
        <View style={styles.scroll}>
          {urls.length === 0 ? (
            <Text style={styles.text}>{this.renderEmpty()}</Text>
          ) : (
            <ImageView
              images={urls}
              imageIndex={0}
              isVisible={this.state.isImageViewVisible}
              onClose={this.handleClose}
            />
          )}
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
    textAlign: 'center',
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
