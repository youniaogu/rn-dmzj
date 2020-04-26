import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {searchManga} from '../actions';

@connect(
  state => {
    const {list, loadStatus} = state.search;

    return {
      list,
      loadStatus,
    };
  },
  {
    searchManga,
  },
)
class Search extends Component {
  state = {
    value: '',
  };

  componentDidUpdate(prevState) {
    if (prevState.loadStatus !== this.props.loadStatus) {
      if (this.props.loadStatus === 2) {
        Actions.result({TYPE: 'search'});
      }
    }
  }

  handleInput = newVal => {
    this.setState({value: newVal});
  };

  handleSearch = () => {
    this.props.searchManga(this.state.value);
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>输入关键字，回车搜索</Text>
        <TextInput
          name="value"
          style={styles.input}
          blurOnSubmit={true}
          onSubmitEditing={this.handleSearch}
          onChangeText={this.handleInput}
          value={this.state.value}
        />
      </View>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ec407a',
    padding: 20,
  },
  text: {
    fontSize: 12,
    color: '#ffffff',
    paddingBottom: 3,
  },
  input: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    padding: 0,
  },
});
