/* eslint-disable no-unused-vars */
// @ts-check
/**
 * @description A file with some code always present in JS files generated
 *     from Please
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 11/05/2021
 * @module PleaseLangPreface
 */

'use strict';

const preface = (() => {
  const $XRegExp = require('xregexp');
  require('../lib/plugins/monkey-patch.js');
}).toString().split('\n').slice(1, -1).map((line) => line.slice(2)).join('\n');

module.exports = {preface};
