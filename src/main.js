// @ts-check
/**
 * @description The main file of the Please lang implementation
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 8/04/2021
 */

'use strict';

const interpret = require('./interpreter.js');
const parse = require('./compiler.js');

/**
 * Parses and executes a program
 * @param {string} program The string with the whole program
 */
const run = (program) => {
  interpret(parse(program));
};

module.exports = {run, interpret, parse};
