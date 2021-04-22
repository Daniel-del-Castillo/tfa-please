// @ts-check
/**
 * @description The file with the code to interpret the Please lang
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 8/04/2021
 * @module PleaseLangInterpreter
 */

'use strict';

const fs = require('fs');
const {parse} = require('../compiler.js');
const {evaluate} = require('./evaluate.js');
const {topScope} = require('./plugins/top-scope.js');
const {keywords} = require('./plugins/keywords.js');

/**
 * A function that interprets a Please JSON AST
 * @param {Object} program The AST of the program to interpret
 * @return {*} The return value of the program
 * @throws Will throw if there are syntactical errors
 */
const interpret = (program) => {
  return evaluate(program, Object.create(topScope));
};

/**
 * A function that interprets a compiled Please file
 * @param {string} fileName The name of the file
 * @return {*} The return value of the program
 * @throws Will throw if it isn't possible to read the file or if there
 *     are syntactical errors
 */
const interpretFromFile = (fileName) => {
  const source = fs.readFileSync(fileName, 'utf8');
  return interpret(JSON.parse(source));
};

/**
 * Parses and executes a Please program
 * @param {Object} program The Please program to run
 * @return {*} The return value of the program
 * @throws Will throw if there are errors in the program
 */
const run = (program) => {
  return interpret(parse(program));
};

/**
 * A function that interprets a Please file
 * @param {string} fileName The name of the file
 * @return {*} The return value of the program
 * @throws Will throw if it isn't possible to read the file or if there
 *     are errors in the program
 */
const runFromFile = (fileName) => {
  const source = fs.readFileSync(fileName, 'utf8');
  return run(source);
};

module.exports = {
  interpret,
  interpretFromFile,
  run,
  runFromFile,
  topScope,
  keywords,
  evaluate,
};
