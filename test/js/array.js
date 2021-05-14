const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $x = [
    [1, 4], 3, 2
  ];
  (() => {
    let val = [$x.sub(0)];
    console.log(...val);
    return val;
  })();
  (() => {
    let val = [$x.sub(1)];
    console.log(...val);
    return val;
  })();
  return (() => {
    let val = [$x.length];
    console.log(...val);
    return val;
  })();
})()
