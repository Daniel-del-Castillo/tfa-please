const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  (() => {
    let val = [(() => {
      let name = "length";
      let op = "hello";
      let processedArgs = [];
      if (op == undefined) {
        return undefined;
      }
      if (typeof op[name] !== 'function') {
        return op[name];
      }
      return (...args) => op[name](...processedArgs, ...args);
    })()];
    console.log(...val);
    return val;
  })();
  return (() => {
    let val = [(() => {
      let name = "toFixed";
      let op = 4;
      let processedArgs = [];
      if (op == undefined) {
        return undefined;
      }
      if (typeof op[name] !== 'function') {
        return op[name];
      }
      return (...args) => op[name](...processedArgs, ...args);
    })()(2)];
    console.log(...val);
    return val;
  })();
})()
