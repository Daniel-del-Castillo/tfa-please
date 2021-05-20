const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $x;
  $x = [1, 2, 3];
  return (() => {
    $x.forEach(($x) => {
      (() => {
        let val = [$x];
        console.log(...val);
        return val;
      })()
    });
  })();
})()
