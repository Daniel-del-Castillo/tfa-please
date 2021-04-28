// @ts-check
/**
 * @description The file with the always available Please functions
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 22/04/2021
 * @module PleaseLangTopScope
 */

'use strict';

/**
 * Some functions that are always available in Please
 */
const topScope = Object.create(null);

/**
 * The true value
 */
topScope.true = true;

/**
 * The false value
 */
topScope.false = false;

/**
 * An undefined value
 */
topScope.undefined = undefined;

/**
 * The basic Please operators
 */
['+', '-', '*', '/', '==', '!=', '<', '>', '&&', '||'].forEach((op) => {
  topScope[op] = Function('a, b', `return a ${op} b;`);
});

/**
 * A function to print a line
 * @param {*} value The value to be printed
 * @return {*} The value that was printed
 */
topScope.println = (value) => {
  console.log(value);
  return value;
};

/**
 * A function to create an array
 * @param {...*} args The values of the array
 * @return {Array} The array
 */
topScope.arr = topScope.array = (...args) => {
  return args;
};

/**
 * A function to get the length of an array
 * @param {Array} array An array
 * @return {number} The length
 */
topScope.len = topScope.length = (array) => {
  return array.length;
};

/**
 * A function to access an element of an array
 * @param {Array} array An array
 * @param {number} index The index of the position to be accessed
 * @return {*} The value in that position
 */
topScope.element = (array, index) => {
  return array[index];
};

module.exports = {topScope};
