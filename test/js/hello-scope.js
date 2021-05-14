const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let val = ["computed value = ", (() => {
    let $x = 4;
    let $inc = (($w, ) => {
      return (() => {
        let $y = 999;
        return ($w + 1);
      })();
    });
    let $z = -1;
    return $x = $inc($x);
  })()];
  console.log(...val);
  return val;
})()
