import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {add} from '../actions';

@connect(
  (state, props) => {
    const {number} = state.home.counter;

    return {
      number,
    };
  },
  {
    add,
  },
)
class Home extends Component {
  componentDidMount() {
    this.props.add();
  }

  render() {
    return <Text>Hello, world{this.props.number}</Text>;
  }
}

export default Home;
