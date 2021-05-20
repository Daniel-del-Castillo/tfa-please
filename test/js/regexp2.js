const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $x;
  let $m;
  let $d;
  $d = $XRegExp(`
         (?<year>  \\d{4} ) -?  # year
         (?<month> \\d{2} ) -?  # month
         (?<day>   \\d{2} )     # day
        `, `x`);
  (() => {
    let val = [(() => {
      let name = "test";
      let processedArgs = [];
      if (typeof $d[name] !== 'function') {
        return $d[name];
      }
      return (...args) => $d[name](...processedArgs, ...args);
    })()("1987-07-14")];
    console.log(...val);
    return val;
  })();
  $m = (() => {
    let name = "exec";
    let processedArgs = [];
    if (typeof $d[name] !== 'function') {
      return $d[name];
    }
    return (...args) => $d[name](...processedArgs, ...args);
  })()("1987-07-14");
  (() => {
    let val = [(() => {
      let name = 0;
      let processedArgs = [];
      if (typeof $m[name] !== 'function') {
        return $m[name];
      }
      return (...args) => $m[name](...processedArgs, ...args);
    })()];
    console.log(...val);
    return val;
  })();
  (() => {
    let val = [(() => {
      let name = "index";
      let processedArgs = [];
      if (typeof $m[name] !== 'function') {
        return $m[name];
      }
      return (...args) => $m[name](...processedArgs, ...args);
    })()];
    console.log(...val);
    return val;
  })();
  $x = (() => {
    let name = "exec";
    let processedArgs = [];
    if (typeof $XRegExp[name] !== 'function') {
      return $XRegExp[name];
    }
    return (...args) => $XRegExp[name](...processedArgs, ...args);
  })()("2015-02-22", $d);
  (() => {
    let val = [(() => {
      let name = "year";
      let processedArgs = [];
      if (typeof(() => {
          let name = "groups";
          let processedArgs = [];
          if (typeof $x[name] !== 'function') {
            return $x[name];
          }
          return (...args) => $x[name](...processedArgs, ...args);
        })()[name] !== 'function') {
        return (() => {
          let name = "groups";
          let processedArgs = [];
          if (typeof $x[name] !== 'function') {
            return $x[name];
          }
          return (...args) => $x[name](...processedArgs, ...args);
        })()[name];
      }
      return (...args) => (() => {
        let name = "groups";
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
  return (() => {
    let val = [(() => {
      let name = "month";
      let processedArgs = [];
      if (typeof(() => {
          let name = "groups";
          let processedArgs = [];
          if (typeof $x[name] !== 'function') {
            return $x[name];
          }
          return (...args) => $x[name](...processedArgs, ...args);
        })()[name] !== 'function') {
        return (() => {
          let name = "groups";
          let processedArgs = [];
          if (typeof $x[name] !== 'function') {
            return $x[name];
          }
          return (...args) => $x[name](...processedArgs, ...args);
        })()[name];
      }
      return (...args) => (() => {
        let name = "groups";
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
