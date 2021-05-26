const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  (() => {
    let val = [(() => {
      let name = "-";
      let processedArgs = [3];
      if (typeof 4[name] !== 'function') {
        return 4[name];
      }
      return (...args) => 4[name](...processedArgs, ...args);
    })()()];
    console.log(...val);
    return val;
  })();
  (() => {
    let val = [(() => {
      let name = "/";
      let processedArgs = [2];
      if (typeof 4[name] !== 'function') {
        return 4[name];
      }
      return (...args) => 4[name](...processedArgs, ...args);
    })()()];
    console.log(...val);
    return val;
  })();
  return (() => {
    let val = [(() => {
      let name = "*";
      let processedArgs = [3];
      if (typeof 4[name] !== 'function') {
        return 4[name];
      }
      return (...args) => 4[name](...processedArgs, ...args);
    })()()];
    console.log(...val);
    return val;
  })();
})()
