const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $x;
  $x = {
    "c": 0,
    "gc": function(...args) {
      let $self = this;
      let f = (() => {
        return (() => {
          let name = "c";
          let processedArgs = [];
          if (typeof $self[name] !== 'function') {
            return $self[name];
          }
          return (...args) => $self[name](...processedArgs, ...args);
        })();
      });
      return f(...args);
    },
    "sc": function(...args) {
      let $self = this;
      let f = (($value, ) => {
        return $self['=']($value, "c");
      });
      return f(...args);
    },
  };
  (() => {
    let val = [(() => {
      let name = "c";
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
      let name = "c";
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
      let name = "gc";
      let processedArgs = [];
      if (typeof $x[name] !== 'function') {
        return $x[name];
      }
      return (...args) => $x[name](...processedArgs, ...args);
    })()()];
    console.log(...val);
    return val;
  })();
  (() => {
    let name = "sc";
    let processedArgs = [];
    if (typeof $x[name] !== 'function') {
      return $x[name];
    }
    return (...args) => $x[name](...processedArgs, ...args);
  })()(5);
  (() => {
    let val = [(() => {
      let name = "gc";
      let processedArgs = [];
      if (typeof $x[name] !== 'function') {
        return $x[name];
      }
      return (...args) => $x[name](...processedArgs, ...args);
    })()()];
    console.log(...val);
    return val;
  })();
  (() => {
    let name = "sc";
    let processedArgs = [];
    if (typeof $x[name] !== 'function') {
      return $x[name];
    }
    return (...args) => $x[name](...processedArgs, ...args);
  })()(9);
  return (() => {
    let val = [(() => {
      let name = "gc";
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
