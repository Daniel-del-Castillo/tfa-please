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
 * Import the XRegExp
 */
topScope.XRegExp = require('xregexp');

/**
 * The basic Please operators
 */
['+', '-', '*', '/', '==', '!=', '<', '>', '&&', '||'].forEach((op) => {
  topScope[op] = Function('a, b', `return a ${op} b;`);
});

/**
 * A function to print a line
 * @param {*} value The value to be printed
 */
topScope.println = (value) => {
  console.log(value);
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
 * @param {...*} indexes The index of the position to be accessed
 * @return {*} The value in that position
 */
topScope.element = (array, ...indexes) => {
  // @ts-ignore
  return array.sub(...indexes);
};

/**
 * A function to create hashes or maps
 * @param {...*} args The arguments are ordered as keys and then
 *     the value for that key
 * @return {object} The newly created object
 */
topScope.map = topScope.hash = (...args) => {
  const hash = {};
  if (args.length % 2 !== 0) {
    throw new Error(
        'To create a hash the number of arguments must be a multiple of two',
    );
  }
  for (let index = 0; index < args.length; index += 2) {
    hash[args[index]] = args[index + 1];
  }
  return hash;
};

module.exports = {topScope};
