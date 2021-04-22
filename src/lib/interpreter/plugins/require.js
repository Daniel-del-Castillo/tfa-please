// @ts-check
/**
 * @description The file with the keywords of the Please lang
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 22/04/2021
 * @module PleaseLangRequirePlugin
 */

'use strict';

const {topScope} = require('./top-scope.js');
const {runFromFile} = require('../interpreter.js');
const path = require('path');

const requireResults = Object.create(null);

topScope.require = (filePath) => {
  if (typeof filePath !== 'string') {
    throw new Error('Invalid argument for require, expected a string');
  }
  if (requireResults[filePath] != undefined) {
    return requireResults[filePath];
  } else {
    const result = runFromFile(filePath);
    requireResults[filePath] = result;
    return result;
  }
};
