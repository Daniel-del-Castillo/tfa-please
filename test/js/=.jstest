const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $w;
  $w = [
    [1, 2],
    [3, 4]
  ];
  (() => {
    let name = "=";
    let processedArgs = [];
    if (typeof $w[name] !== 'function') {
      return $w[name];
    }
    return (...args) => $w[name](...processedArgs, ...args);
  })()(5, 0, 1);
  return (() => {
    let val = [$w];
    console.log(...val);
    return val;
  })();
})()
