const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $r = $XRegExp(`(\\w+)
           \\s+
           (\\d+) 
          `, `x`);
  let $s = (() => {
    let name = "test";
    let processedArgs = [];
    if (typeof $r[name] !== 'function') {
      return $r[name];
    }
    return (...args) => $r[name](...processedArgs, ...args);
  })()("a 4");
  let $m = (() => {
    let name = "exec";
    let processedArgs = [];
    if (typeof $r[name] !== 'function') {
      return $r[name];
    }
    return (...args) => $r[name](...processedArgs, ...args);
  })()(";;; a 42");
  (() => {
    let val = [$s];
    console.log(...val);
    return val;
  })();
  return (() => {
    let val = [$m];
    console.log(...val);
    return val;
  })();
})()
