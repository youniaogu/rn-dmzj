import React from 'react';
import {View, PanResponder, StyleSheet} from 'react-native';
import {getSize} from './util';
import FitImage from 'react-native-fit-image';

export default function fitImage({item}) {
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      console.log('start');
    },
    onPanResponderMove: (evt, gestureState) => {
      console.log('move');
    },
    onPanResponderRelease: () => {
      console.log('end');
    },
  });

  return (
    <View {...this.panResponder.panHandlers}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  pic: {
    width: getSize(),
    height: getSize({type: 'height', sub: 40}),
  },
});
