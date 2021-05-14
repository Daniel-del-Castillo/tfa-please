const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $sum = (($nums, ) => {
    return (() => {
      let $i = 0;
      let $s = 0;
      while (($i < $nums.length) !== false) {
        (() => {
          $s = ($s + $nums.sub($i));
          return $i = ($i + 1);
        })()
      };
      return $s;
    })();
  });
  return (() => {
    let val = [("sum(array(1, 2, 3)) := " + $sum([1, 2, 3]))];
    console.log(...val);
    return val;
  })();
})()
