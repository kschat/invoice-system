import R from 'ramda';

const NetworkError = R.partial(Error, 'Network Error');

const InvalidJsonError = R.partial(
  Error,
  'Content-Type: application/json returned invalid JSON'
);

const jsonContentRegex = /application\/json/i;

const request = (url, { method = 'GET', status = 200 } = {}) => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.open(method, url);

    req.onload = () => {
      if(req.status !== (status)) {
        return reject(Error(req.statusText));
      }

      if(jsonContentRegex.test(req.getResponseHeader('Content-Type'))) {
        try {
          return resolve(JSON.parse(req.response));
        }
        catch(ex) {
          return reject(InvalidJsonError());
        }
      }

      return resolve(req.response);
    };

    req.onerror = R.compose(reject, NetworkError);

    req.send();
  });
};

export default request;
