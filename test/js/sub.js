const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $x = [1, [3, 4]];
  (() => {
    let val = [(() => {
      let name = "sub";
      let processedArgs = [];
      if (typeof $x[name] !== 'function') {
        return $x[name];
      }
      return (...args) => $x[name](...processedArgs, ...args);
    })()(1, 1)];
    console.log(...val);
    return val;
  })();
  return (() => {
    let val = [$x.sub(1, 1)];
    console.log(...val);
    return val;
  })();
})()
