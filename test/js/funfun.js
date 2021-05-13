const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $f = (($x, ) => {
    return (($y, ) => {
      return ($x + $y)
    })
  });
  return (() => {
    let val = [$f(2)(4)];
    console.log(...val);
    return val;
  })();
})()
