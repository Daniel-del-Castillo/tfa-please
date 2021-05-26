const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $x;
  $x = "hello";
  return (() => {
    let val = [(() => {
      let name = "toUpperCase";
      let processedArgs = [];
      if (typeof $x[name] !== 'function') {
        return $x[name];
      }
      return (...args) => $x[name](...processedArgs, ...args);
    })()()];
    console.log(...val);
    return val;
  })();
})()
