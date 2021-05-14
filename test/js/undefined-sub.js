const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $x = [1, 2];
  return (() => {
    let val = [(() => {
      let name = "sub";
      let processedArgs = [];
      if (typeof $x[name] !== 'function') {
        return $x[name];
      }
      return (...args) => $x[name](...processedArgs, ...args);
    })()(1, 2, 3, 4, 5)];
    console.log(...val);
    return val;
  })();
})()
