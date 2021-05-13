// @ts-check
/**
 * @description The file with the code to transpile a Please lang file to JS
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 11/05/2021
 * @module PleaseLangTranspiler
 */

'use strict';

const fs = require('fs');
const {parse} = require('./compiler.js');
const {jsonToAST} = require('./json_to_ast.js');
const {preface} = require('./preface.js');
const beautify = require('js-beautify').js;

/**
 * A function that converts a Please program to JS
 * @param {Object} program The AST of the program to convert
 * @return {string} The program in JS
 * @throws Will throw if there are syntactical errors
 */
const convertToJS = (program) => {
  return beautify(
      preface + program.toJS(),
      {indent_size: 2, end_with_newline: true},
  );
};

/**
 * A function that converts a compiled Please file to JS
 * @param {string} fileName The name of the file
 * @return {string} The program in JS
 * @throws Will throw if it isn't possible to read the file or if there
 *     are syntactical errors
 */
const convertToJSFromCompiledFile = (fileName) => {
  const source = fs.readFileSync(fileName, 'utf8');
  const json = JSON.parse(source);
  const ast = jsonToAST(json);
  return convertToJS(ast);
};

/**
 * A function that converts a Please file to JS
 * @param {string} fileName The name of the file
 * @return {string} The program in JS
 * @throws Will throw if it isn't possible to read the file or if there
 *     are errors in the program
 */
const convertToJSFromFile = (fileName) => {
  const source = fs.readFileSync(fileName, 'utf8');
  return convertToJS(parse(source));
};

/**
 * A function that transpiles a Please file
 * @param {string} origin The name of the origin file
 * @param {string} destination The name of the destination file
 * @throws Will throw if there are errors in the program or if the files
 *     can't be opened
 */
const transpile = (origin, destination = undefined) => {
  const js = convertToJSFromFile(origin);
  if (destination == undefined) {
    destination = origin.match(/^[^\.]*/)[0] + '.js';
  }
  fs.writeFileSync(destination, js);
};

/**
 * A function that transpiles a compiled Please file
 * @param {string} origin The name of the origin file
 * @param {string} destination The name of the destination file
 * @throws Will throw if there are errors in the program or if the files
 *     can't be opened
 */
const transpileFromCompiled = (origin, destination = undefined) => {
  const js = convertToJSFromCompiledFile(origin);
  if (destination == undefined) {
    destination = origin.match(/^[^\.]*/)[0] + '.js';
  }
  fs.writeFileSync(destination, js);
};

module.exports = {
  convertToJS,
  convertToJSFromFile,
  convertToJSFromCompiledFile,
  transpile,
  transpileFromCompiled,
};
