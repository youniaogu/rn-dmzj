import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {loadMangaPage} from '../actions';
import {getSize} from './util';
import {Actions} from 'react-native-router-flux';
import ImageView from 'react-native-image-viewing';

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
    visible: true,
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
    this.setState({visible: false}, function() {
      Actions.pop();
    });
  };
  renderFooter = ({imageIndex}) => {
    const {urls = []} = this.props.page || {};

    return (
      <View style={styles.footer}>
        <Text style={styles.text}>{`${imageIndex + 1} / ${urls.length}`}</Text>
      </View>
    );
  };

  render() {
    const {urls = []} = this.props.page || {};

    return (
      <View style={styles.wrapper}>
        <View style={styles.scroll}>
          {urls.length === 0 ? (
            <Text style={styles.text}>{this.renderEmpty()}</Text>
          ) : (
            <ImageView
              images={urls}
              imageIndex={0}
              presentationStyle="overFullScreen"
              visible={this.state.visible}
              swipeToCloseEnabled={false}
              onRequestClose={this.handleClose}
              HeaderComponent={this.renderHeader}
              FooterComponent={this.renderFooter}
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
