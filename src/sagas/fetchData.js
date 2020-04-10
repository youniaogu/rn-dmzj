function fetchData({url, method, body}) {
  const init = {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  };

  if (method === 'POST' || method === 'post') {
    init.method = 'POST';
    init.headers['Content-Type'] = 'application/json';

    if (body && Object.keys(body).length !== 0) {
      init.body = JSON.stringify(body);
    }
  } else {
    init.method = 'GET';

    if (body && Object.keys(body).length !== 0) {
      url +=
        '?' +
        Object.keys(params)
          .map(key => key + '=' + params[key])
          .join('&');
    }
  }

  return fetch(url, init)
    .then(res => {
      return res.json();
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      return {error};
    });
}

export default fetchData;
