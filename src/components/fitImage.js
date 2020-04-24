import React from 'react';
import {View, PanResponder, StyleSheet} from 'react-native';
import {getSize} from './util';
import FitImage from 'react-native-fit-image';

export default function fitImage({item}) {
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      console.log('start');
      // console.log('evt', evt);
      // console.log('gestureState', gestureState);
    },
    onPanResponderMove: (evt, gestureState) => {
      console.log('move');
      // console.log('evt', evt);
      // console.log('gestureState', gestureState);
    },
    onPanResponderRelease: (evt, gestureState) => {
      console.log('end');
      // console.log('evt', evt);
      // console.log('gestureState', gestureState);
    },
    onPanResponderTerminate: (evt, gestureState) => {
      return true;
    },
  });

  return (
    // <View {...this.panResponder.panHandlers}>
    <FitImage
      style={styles.pic}
      indicatorColor="white"
      indicatorSize="large"
      resizeMode="contain"
      source={{
        uri: item.url,
        headers: {
          referer: 'https://m.dmzj.com',
        },
      }}
    />
    // </View>
  );
}

const styles = StyleSheet.create({
  pic: {
    width: getSize(),
    height: getSize({type: 'height', sub: 40}),
  },
});
