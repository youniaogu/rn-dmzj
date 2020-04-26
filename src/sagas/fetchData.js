import {splitChapter, splitPage, splitSearch} from './splitData';

export function fetchData({url, method = 'GET', body, type}) {
  return fetch(url, {
    method,
  })
    .then(res => {
      if (body === 'html') {
        return res.text();
      } else {
        return res.json();
      }
    })
    .then(json => {
      switch (type) {
        case 'chapter': {
          return splitChapter(json);
        }
        case 'page': {
          return splitPage(json);
        }
        case 'search': {
          return splitSearch(json);
        }
        default:
          return json;
      }
    })
    .catch(error => {
      return {error};
    });
}
