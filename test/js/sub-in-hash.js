const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $x = {
    "a": 1,
    "b": 4,
    "c": {
      "d": 5,
      "e": 3,
    },
  };
  (() => {
    let val = [(() => {
      let name = "sub";
      let processedArgs = [];
      if (typeof $x[name] !== 'function') {
        return $x[name];
      }
      return (...args) => $x[name](...processedArgs, ...args);
    })()("a")];
    console.log(...val);
    return val;
  })();
  (() => {
    let val = [(() => {
      let name = "sub";
      let processedArgs = [];
      if (typeof $x[name] !== 'function') {
        return $x[name];
      }
      return (...args) => $x[name](...processedArgs, ...args);
    })()("c", "d")];
    console.log(...val);
    return val;
  })();
  (() => {
    let val = [(() => {
      let name = "e";
      let processedArgs = [];
      if (typeof(() => {
          let name = "sub";
          let processedArgs = [];
          if (typeof $x[name] !== 'function') {
            return $x[name];
          }
          return (...args) => $x[name](...processedArgs, ...args);
        })()("c")[name] !== 'function') {
        return (() => {
          let name = "sub";
          let processedArgs = [];
          if (typeof $x[name] !== 'function') {
            return $x[name];
          }
          return (...args) => $x[name](...processedArgs, ...args);
        })()("c")[name];
      }
      return (...args) => (() => {
        let name = "sub";
        let processedArgs = [];
        if (typeof $x[name] !== 'function') {
          return $x[name];
        }
        return (...args) => $x[name](...processedArgs, ...args);
      })()("c")[name](...processedArgs, ...args);
    })()];
    console.log(...val);
    return val;
  })();
  return (() => {
    let val = [(() => {
      let name = "sub";
      let processedArgs = [];
      if (typeof $x[name] !== 'function') {
        return $x[name];
      }
      return (...args) => $x[name](...processedArgs, ...args);
    })()("b")];
    console.log(...val);
    return val;
  })();
})()
