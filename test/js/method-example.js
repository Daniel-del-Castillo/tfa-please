const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  (() => {
    let val = [(() => {
      let name = "length";
      let processedArgs = [];
      if (typeof "hello" [name] !== 'function') {
        return "hello" [name];
      }
      return (...args) => "hello" [name](...processedArgs, ...args);
    })()];
    console.log(...val);
    return val;
  })();
  return (() => {
    let val = [(() => {
      let name = "toFixed";
      let processedArgs = [];
      if (typeof 4[name] !== 'function') {
        return 4[name];
      }
      return (...args) => 4[name](...processedArgs, ...args);
    })()(2)];
    console.log(...val);
    return val;
  })();
})()
