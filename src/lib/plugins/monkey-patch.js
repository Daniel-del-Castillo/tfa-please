/* eslint-disable no-invalid-this */
/* eslint-disable no-extend-native */
// @ts-nocheck
/**
 * @description The file with the methods added to base objects in Please
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 29/04/2021
 * @module PleaseLangMonkeyPatch
 */

'use strict';

/**
 * A method that allows to index an object with several levels of depth
 * @param  {...*} indexes The indexes
 * @return {*} The element behind that index
 */
Object.prototype.sub = function(...indexes) {
  if (indexes[0] < 0 && this instanceof Array) {
    indexes[0] += this.length;
  }
  if (this[indexes[0]] == undefined) {
    return undefined;
  }
  const rest = indexes.slice(1);
  if (rest.length === 0) {
    return this[indexes[0]];
  }
  return this[indexes[0]].sub(rest);
};

/**
 * A method that allows to assign a value to a certain position in
 *     an object. The position can be indexed through more than one level
 * @param  {*} value The value to assign
 * @param  {...*} indexes The indexes
 */
Object.prototype['='] = function(value, ...indexes) {
  if (typeof this !== 'object' || this == undefined) {
    throw new TypeError(
        `The object ${JSON.stringify(this)} isn't indexable`,
    );
  }
  if (indexes[0] < 0 && this instanceof Array) {
    indexes[0] += this.length;
  }
  const rest = indexes.slice(1);
  if (rest.length === 0) {
    this[indexes[0]] = value;
    return;
  }
  this[indexes[0]]['='](value, rest);
};

/**
 * A method that allows getting a string representation of the object
 * @return {string} The string representation
 */
Object.prototype.toString = function() {
  return JSON.stringify(this);
};

/**
 * A method that allows adding numbers
 * @param  {*} values The values to add
 * @return {*} The result of the operation
 */
Number.prototype['+'] = function(...values) {
  return values.reduce((acc, element) => {
    return acc + element;
  }, this);
};

/**
 * A method that allows subtracting numbers
 * @param  {*} values The values to subtract
 * @return {*} The result of the operation
 */
Number.prototype['-'] = function(...values) {
  return values.reduce((acc, element) => {
    return acc - element;
  }, this);
};

/**
 * A method that allows multiplying numbers
 * @param  {*} values The values to multiply
 * @return {*} The result of the operation
 */
Number.prototype['*'] = function(...values) {
  return values.reduce((acc, element) => {
    return acc * element;
  }, this);
};

/**
 * A method that allows dividing numbers
 * @param  {*} values The values to divide
 * @return {*} The result of the operation
 */
Number.prototype['/'] = function(...values) {
  return values.reduce((acc, element) => {
    return acc / element;
  }, this);
};

module.exports = {};
