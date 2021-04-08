// @ts-check
/**
 * @description The file with the code to interpret the Please lang
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 8/04/2021
 */

'use strict';

const WHITE = /^(?:\s|\/\/.*|\/\*(?:.|\n)*?\*\/)*/;
const STRING = /^(["'])(?:[^\1\\]|\\.)*?\1/;
const NUMBER = /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/;
const WORD = /^[^\s(),"'\\]+/;

/**
 * A function that deletes starting whites from a string
 * @param {string} string The string to clean
 * @return {string} The cleaned string
 */
const skipSpace = (string) => {
  return string.slice(WHITE.exec(string)[0].length);
};

/**
 * A function that parses an expression
 * @param {string} program The string with the unparsed expression
 * @return {Object} The JSON AST of the expression
 * @private
 */
const parseExpression = (program) => {
  program = skipSpace(program);
  let match;
  let expr;
  if (match = STRING.exec(program)) {
    expr = {type: 'value', value: match[1]};
  } else if (match = NUMBER.exec(program)) {
    expr = {type: 'value', value: Number(match[0])};
  } else if (match = WORD.exec(program)) {
    expr = {type: 'word', name: match[0]};
  } else {
    throw new SyntaxError(`Unexpected syntax: ${program}`);
  }
  return parseCall(expr, program.slice(match[0].length));
};

/**
 * A function that parses a call
 * @param {Object} expr The already parsed previous part of the program
 * @param {string} program The string with the unparsed call
 * @return {Object} The JSON AST of the call
 * @private
 */
const parseCall = (expr, program) => {
  program = skipSpace(program);
  if (program[0] !== '(') {
    return {expr, rest: program};
  }
  program = skipSpace(program.slice(1));
  expr = {type: 'call', operator: expr, args: []};
  while (program[0] !== ')') {
    const arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] === ',') {
      program = skipSpace(program.slice(1));
    } else if (program[0] !== ')') {
      throw new SyntaxError('Expected \',\' or \')\'');
    }
  }

  return parseCall(expr, program.slice(1));
};

/**
 * A function that parses a Please program
 * @param {string} program The string with the unparsed program
 * @return {Object} The JSON AST of the program
 */
const parse = (program) => {
  const {expr, rest} = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError('Unexpected text after program');
  }
  return expr;
};

module.exports = parse;
