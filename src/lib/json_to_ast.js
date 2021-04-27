// @ts-check
/**
 * @description Exports a function and a map that allow to convert a compiled
 *     Please program already parsed as JSON into an AST
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 27/04/2021
 * @module PleaseLangJsonToAST
 */

'use strict';

const {Word, Value, Call} = require('./ast.js');

/**
 * Stores functions capable of transforming a node type from parsed JSON to AST
 */
const jsonToASTMap = Object.create(null);

/**
 * Converts a Value node
 * @param {object} json The already parsed JSON representation
 * @return {Value} The AST representation
 */
jsonToASTMap.Value = (json) => {
  return new Value(json);
};

/**
 * Converts a Word node
 * @param {object} json The already parsed JSON representation
 * @return {Word} The AST representation
 */
jsonToASTMap.Word = (json) => {
  return new Word(json);
};

/**
 * Converts a Call node
 * @param {object} json The already parsed JSON representation
 * @return {Call} The AST representation
 */
jsonToASTMap.Call = (json) => {
  const operator = jsonToAST(json.operator);
  const args = json.args.map(jsonToAST);
  return new Call(operator, args);
};

const jsonToAST = (json) => {
  if (jsonToASTMap[json.type] != undefined) {
    return jsonToASTMap[json.type](json);
  }
  throw new SyntaxError('Invalid node type: ' + json.type);
};

module.exports = {jsonToAST, jsonToASTMap};
