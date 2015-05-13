'use strict';

let index = function *() {
  yield this.render('home');
};

module.exports = { index };
