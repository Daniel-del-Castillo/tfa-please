const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let val = ["Hello world\nHello"];
  console.log(...val);
  return val;
})()
