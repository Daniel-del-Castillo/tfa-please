const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $x = [1, [2, 3]];
  return (() => {
    let val = [$x.sub(-1)];
    console.log(...val);
    return val;
  })();
})()
