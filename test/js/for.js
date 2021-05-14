const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $x = 7;
  for (let $x = 0;
    ($x < 5) !== false; $x = ($x + 1)) {
    (() => {
      let val = [$x];
      console.log(...val);
      return val;
    })()
  };
  return (() => {
    let val = [$x];
    console.log(...val);
    return val;
  })();
})()
