// @ts-check
/**
 * @description The main file of the Please lang implementation
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 8/04/2021
 * @module PleaseLang
 */

'use strict';

const {
  interpret,
  interpretFromFile,
  run,
  runFromFile,
  topScope,
  keywords,
  evaluate,
} = require('./lib/interpreter/interpreter.js');

const {
  parse,
  parseCall,
  parseExpression,
  parseFromFile,
  compile,
  Lexer,
} = require('./lib/compiler.js');

module.exports = {
  interpret,
  interpretFromFile,
  run,
  runFromFile,
  topScope,
  keywords,
  evaluate,
  parse,
  parseCall,
  parseExpression,
  parseFromFile,
  compile,
  Lexer,
};
