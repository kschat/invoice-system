'use strict';

let R = require('ramda')
  , Schema = require('jugglingdb').Schema;

module.exports = R.memoize(function init(settings) {
  return new Schema(
    settings.type,
    R.omit(['type'], settings)
  );
});
