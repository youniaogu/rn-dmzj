import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {loadMangaPage, setProgress} from '../actions';
import {getSize} from './util';
import {Actions} from 'react-native-router-flux';
import ImageView from 'react-native-image-viewing';

@connect(
  (state, props) => {
    const {page, progress} = state;
    const {id, cid} = props;

    return {
      progress: progress[cid] || {},
      page: page[id],
      id,
      cid,
    };
  },
  {loadMangaPage, setProgress},
)
class Page extends Component {
  state = {
    bol: true,
  };

  componentDidMount() {
    const {id, cid, page, loadMangaPage} = this.props;

    if (typeof page === 'undefined') {
      loadMangaPage(id, cid);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.progress !== this.props.progress) {
      const {id, index} = this.props.progress;
      const {id: newId, index: newIndex} = nextProps.progress;

      if (newId === id && newIndex !== index) {
        return false;
      }
    }

    return true;
  }

  renderHeader = () => {
    const {name = ''} = this.props.page || {};

    return (
      <View style={styles.header}>
        <Text style={styles.text}>{name}</Text>
      </View>
    );
  };
  renderEmpty = () => {
    const {loadStatus} = this.props.page || {};

    return loadStatus === 1 ? '加载中' : '内容为空!';
  };
  handleClose = () => {
    Actions.pop();
  };
  renderFooter = ({imageIndex}) => {
    const {urls = []} = this.props.page || {};

    return (
      <View style={styles.footer}>
        <Text style={styles.text}>{`${imageIndex + 1} / ${urls.length}`}</Text>
      </View>
    );
  };

  handleIndexChange = index => {
    const {cid, id, setProgress} = this.props;

    if (this.state.bol) {
      this.setState({bol: false});
      return;
    }

    setProgress({cid, id, index});
  };

  render() {
    const {page = {}, progress} = this.props;
    const {urls = []} = page;

    return (
      <View style={styles.wrapper}>
        <View style={styles.scroll}>
          {urls.length === 0 ? (
            <Text style={styles.text}>{this.renderEmpty()}</Text>
          ) : (
            <ImageView
              images={urls}
              imageIndex={progress.index}
              presentationStyle="overFullScreen"
              visible={true}
              swipeToCloseEnabled={false}
              onRequestClose={this.handleClose}
              HeaderComponent={this.renderHeader}
              FooterComponent={this.renderFooter}
              onImageIndexChange={this.handleIndexChange}
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
    width: getSize(),
    height: getSize({type: 'height'}),
  },
  scroll: {
    flex: 1,
    width: getSize(),
    height: getSize({type: 'height', sub: 40}),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 20,
    alignItems: 'center',
  },
  footer: {
    height: 20,
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
  },
});
