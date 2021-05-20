const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let val = ["computed value = ", (() => {
    let $z;
    let $inc;
    let $x;
    $x = 4;
    $inc = (($w, ) => {
      return (() => {
        let $y;
        $y = 999;
        return ($w + 1);
      })();
    });
    $z = -1;
    return $x = $inc($x);
  })()];
  console.log(...val);
  return val;
})()
