'use strict';

const index = function *(next) {
  yield this.render('home');
};

module.exports = { index };
