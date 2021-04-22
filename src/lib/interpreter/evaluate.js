// @ts-check
/**
 * @description The file with the function to evaluate Please code
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 22/04/2021
 * @module PleaseLangEvaluator
 */

'use strict';

/**
 * An object with the different keywords of the language
 */
const keywords = Object.create(null);

/**
 * A function that evaluates an expression
 * @param {Object} tree The expression as a JSON AST
 * @param {Object} scope The scope
 * @return {*} The value of the evaluated expression
 * @throws Will throw if there are semantical errors
 */
const evaluate = (tree, scope) => {
  if (tree.type === 'VALUE') {
    return tree.value;
  } else if (tree.type === 'WORD') {
    if (tree.name in scope) {
      return scope[tree.name];
    } else {
      throw new ReferenceError(`Undefined binding: ${tree.name}`);
    }
  } else if (tree.type === 'CALL') {
    const {operator, args} = tree;
    if (operator.type === 'WORD' &&
        operator.name in keywords) {
      return keywords[operator.name](tree.args, scope);
    } else {
      const op = evaluate(operator, scope);
      if (typeof op === 'function') {
        return op(...args.map((arg) => evaluate(arg, scope)));
      } else {
        throw new TypeError('Calling a non-function.');
      }
    }
  }
};

module.exports = {evaluate, keywords};
