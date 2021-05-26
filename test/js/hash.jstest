const $XRegExp = require('xregexp');
require('../lib/plugins/monkey-patch.js');
(() => {
  let $x;
  $x = {
    "x": 4,
    "y": {
      "z": 3,
    },
  };
  (() => {
    let val = [$x.sub("y", "z")];
    console.log(...val);
    return val;
  })();
  $x['='](50, "y", "z");
  (() => {
    let val = [$x];
    console.log(...val);
    return val;
  })();
  return (() => {
    let val = [$x.sub("y")];
    console.log(...val);
    return val;
  })();
})()
