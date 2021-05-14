const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  (() => {
    let val = [1];
    console.log(...val);
    return val;
  })();
  let $x = undefined;
  let $y = true;
  let $c = false;
  return $c;
})()
