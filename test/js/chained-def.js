const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
let $a;
let $x;
(() => {
  let val = [$x = $a = 3];
  console.log(...val);
  return val;
})()
