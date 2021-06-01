// @ts-nocheck
/**
 * @description The file with the code to optimize Please lang compiled version
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 1/06/2021
 * @module PleaseLangOptimizations
 */

'use strict';

const {replace} = require('estraverse');
const {Value, Call} = require('./ast');
const {operators, topScope} = require('./plugins/top-scope.js');

/**
 * Optimizes an ast
 * @param {Object} ast The ast of the Please program to optimize
 * @return {Object} The optimized ast
 */
const optimize = (ast) => {
  return replace(ast, {
    leave: (node) => {
      if (node instanceof Call && operators.includes(node.operator.name) &&
          node.args[0] instanceof Value && node.args[1] instanceof Value) {
        return new Value({value: node.evaluate(topScope)});
      }
    },
    fallback: (node) => {
      return Object.keys(node).filter(function(key) {
        return !['type', 'value', 'name', 'expression', 'flags'].includes(key);
      });
    },
  });
};

module.exports = {optimize};
