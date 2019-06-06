import jsonp from 'jsonp';

// {
//   page: 1,
//   psize: 20
// }
// page=1&psize=20

const parseParam = param => {
  let params = [];

  for (const key in param) {
    params.push([key, encodeURIComponent(param[key])]);
  }
  // [[page, 1], [pszie, 20]]
  return params.map(value => value.join('=')).join('&');
  // [[page, 1], [pszie, 20]]
  // [page=1, psize=20]
  // page=1&psize=20
};

export default (url, data, options) => {
  url += (url.indexOf('?') < 0 ? '?' : '&') + parseParam(data);

  return new Promise((resolve, reject) => {
    jsonp(url, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
