import {Dimensions} from 'react-native';

export function getSize(option = {}) {
  const {select, type, sub, nub} = {
    select: 'window',
    type: 'width',
    sub: 0,
    nub: 1,
    ...option,
  };

  return (Dimensions.get(select)[type] - sub) / nub;
}
