const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  (() => {
    let val = [(() => {
      let name = "+";
      let processedArgs = [5];
      if (typeof 4[name] !== 'function') {
        return 4[name];
      }
      return (...args) => 4[name](...processedArgs, ...args);
    })()(3)];
    console.log(...val);
    return val;
  })();
  return 12;
})()
