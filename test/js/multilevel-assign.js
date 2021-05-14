const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $x = [1, 3, [7]];
  $x['='](9, 1);
  $x['='](1000, -1, 0);
  return (() => {
    let val = [$x];
    console.log(...val);
    return val;
  })();
})()
