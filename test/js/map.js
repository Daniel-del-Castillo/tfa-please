const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $x = [1, 2, 3, 4];
  let $inc = (($x, $i, $g, ) => {
    return ($x + 1);
  });
  return (() => {
    let val = [(() => {
      let name = "map";
      let processedArgs = [];
      if (typeof $x[name] !== 'function') {
        return $x[name];
      }
      return (...args) => $x[name](...processedArgs, ...args);
    })()($inc)];
    console.log(...val);
    return val;
  })();
})()
