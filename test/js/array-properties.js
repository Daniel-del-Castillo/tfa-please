const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $x = [1, 4, [5, 3]];
  (() => {
    let val = [(() => {
      let name = 0;
      let processedArgs = [];
      if (typeof $x[name] !== 'function') {
        return $x[name];
      }
      return (...args) => $x[name](...processedArgs, ...args);
    })()];
    console.log(...val);
    return val;
  })();
  (() => {
    let val = [(() => {
      let name = 2;
      let processedArgs = [];
      if (typeof $x[name] !== 'function') {
        return $x[name];
      }
      return (...args) => $x[name](...processedArgs, ...args);
    })()];
    console.log(...val);
    return val;
  })();
  return (() => {
    let val = [(() => {
      let name = 1;
      let processedArgs = [];
      if (typeof(() => {
          let name = 2;
          let processedArgs = [];
          if (typeof $x[name] !== 'function') {
            return $x[name];
          }
          return (...args) => $x[name](...processedArgs, ...args);
        })()[name] !== 'function') {
        return (() => {
          let name = 2;
          let processedArgs = [];
          if (typeof $x[name] !== 'function') {
            return $x[name];
          }
          return (...args) => $x[name](...processedArgs, ...args);
        })()[name];
      }
      return (...args) => (() => {
        let name = 2;
        let processedArgs = [];
        if (typeof $x[name] !== 'function') {
          return $x[name];
        }
        return (...args) => $x[name](...processedArgs, ...args);
      })()[name](...processedArgs, ...args);
    })()];
    console.log(...val);
    return val;
  })();
})()
