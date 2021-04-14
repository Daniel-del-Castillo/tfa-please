// @ts-check
/**
 * @description The file with the code to interpret the Please lang
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 8/04/2021
 * @module
 */

'use strict';

const fs = require('fs');

/**
 * A lexer class that takes care of the lexical analysis
 * @private
 */
class Lexer {
  /**
   * The constructor of the lexer
   * @param {string} source The source code of the program to analyze
   */
  constructor(source) {
    /** @const {string} @private */
    this.source_= source;
    /** @const {number} @private */
    this.line_ = 1;
    /** @const {number} @private */
    this.column_ = 1;
    /** @const {number} @private */
    this.offset_ = 0;
    /** @const {RegExp} @private */
    this.WHITE_ = /^(?:\s|\/\/.*|\/\*(?:.|\n)*?\*\/)*/;
    /** @const {RegExp} @private */
    this.STRING_ = /^(["'])(?:[^\1\\]|\\.)*?\1/;
    /** @const {RegExp} @private */
    this.NUMBER_ = /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/;
    /** @const {RegExp} @private */
    this.WORD_ = /^[^\s(),"'\\]+/;
    /** @const {RegExp} @private */
    this.COMMA_ = /^,/;
    /** @const {RegExp} @private */
    this.LEFT_PARENTHESIS_ = /^\(/;
    /** @const {RegExp} @private */
    this.RIGHT_PARENTHESIS_ = /^\)/;
  }

  /**
   * A method that returns the next token of the source
   * @return {object} The next token
   */
  nextToken() {
    this.skipSpace_();
    let match;
    const result = {};
    if (this.source_.length === 0) {
      throw new SyntaxError(
          `Unexpected EOF at line ${this.line_} and column ${this.column_}`,
      );
    }
    if ((match = this.STRING_.exec(this.source_)) ||
        (match = this.NUMBER_.exec(this.source_))) {
      result.type = 'value';
      result.value = match[0];
    } else if (match = this.WORD_.exec(this.source_)) {
      result.type = 'word';
      result.name = match[0];
    } else if (match = this.COMMA_.exec(this.source_)) {
      result.type = 'comma';
      result.value = match[0];
    } else if (match = this.LEFT_PARENTHESIS_.exec(this.source_)) {
      result.type = 'left_parenthesis';
      result.value = match[0];
    } else if (match = this.RIGHT_PARENTHESIS_.exec(this.source_)) {
      result.type = 'right_parenthesis';
      result.value = match[0];
    } else {
      throw new SyntaxError(
          `Invalid token: ${/..*?\b/.exec(this.source_)[0]} at line` +
          ` ${this.line_} and column ${this.column_}`,
      );
    }
    result.offset = this.offset_;
    result.line = this.line_;
    result.column = this.column_;
    this.updateAfterMatch_(match);
    return result;
  }

  /**
   * A function to update the lexer after consuming a token
   * @param {Object} match The match found
   * @private
   */
  updateAfterMatch_(match) {
    const lineStart = this.source_.lastIndexOf('\n', this.offset_);
    this.column_ = this.offset_ - (lineStart >= 0 ? lineStart : 0) + 1;
    this.offset_ += match[0].length;
    this.line_ += match[0].split(/\n/).length - 1;
    this.source_ = this.source_.slice(match[0].length);
  }

  /**
   * A function to check if there are more tokens in the input
   * @return {boolean} Whether is it empty or not
   */
  isEmpty() {
    return this.source_.length === 0;
  }

  /**
   * A function that deletes starting whites from the source
   * @private
   */
  skipSpace_() {
    const match = this.WHITE_.exec(this.source_);
    this.updateAfterMatch_(match);
  };
}


/**
 * A function that parses an expression
 * @param {Lexer} lexer An instance of the Lexer class initialized with
 *     the source of the program
 * @return {Object} The JSON AST of the expression
 * @private
 */
const parseExpression = (lexer) => {
  const token = lexer.nextToken();
  console.log(token.type);
  if (token.type === 'word') {
    return parseCall(token, lexer);
  }
  if (token.type === 'string' || token.type === 'number') {
    return token;
  }
  throw new SyntaxError(
      `Unexpected token: ${token.value} at line` +
      ` ${token.line} and column ${token.column}`,
  );
};

/**
 * A function that parses a call
 * @param {Object} ast The already parsed previous part of the program
 * @param {Lexer} lexer An instance of the Lexer class properly initialized
 * @return {Object} The JSON AST of the call
 * @private
 */
const parseCall = (ast, lexer) => {
  if (lexer.isEmpty()) {
    return ast;
  }
  let token = lexer.nextToken();
  if (token.type === 'right_parenthesis' || token.type === 'comma') {
    return ast;
  }
  if (token.type !== 'left_parenthesis') {
    throw new SyntaxError(
        `Unexpected token: ${token.value} at line` +
        ` ${token.line} and column ${token.column}, expected '('`,
    );
  }
  ast = {type: 'call', operator: ast, args: []};
  token = lexer.nextToken();
  while (token.type !== 'right_parenthesis') {
    const arg = parseExpression(lexer);
    ast.args.push(arg.expr);
    token = lexer.nextToken();
    if (token.type !== 'comma' && token.type !== 'right_parenthesis') {
      throw new SyntaxError('Expected \',\' or \')\'');
    }
  }

  return parseCall(ast, lexer);
};

/**
 * A function that parses a Please program
 * @param {string} program The string with the unparsed program
 * @return {Object} The AST of the program
 */
const parse = (program) => {
  const lexer = new Lexer(program);
  const ast = parseExpression(lexer);
  if (!lexer.isEmpty()) {
    throw new SyntaxError('Unexpected text after program');
  }
  return ast;
};

/**
 * A function that reads a file and parses its contents
 * @param {string} fileName The name of the file
 * @return {Object} The JSON AST of the program
 */
const parseFromFile = (fileName) => {
  try {
    const source = fs.readFileSync(fileName, 'utf8');
    return parse(source);
  } catch (err) {
    console.log(err);
  }
};

/**
 * A function that compiles a Please file
 * @param {string} origin The name of the origin file
 * @param {string} destination The name of the destination file
 */
const compile = (origin, destination) => {
  try {
    const source = fs.readFileSync(origin, 'utf8');
    if (destination == undefined) {
      destination = origin.match(/^[^\.]*/)[0] + '.cpls';
    }
    const ast = JSON.stringify(parse(source), null, 2);
    fs.writeFileSync(destination, ast);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {parse, parseCall, parseExpression, parseFromFile, compile};
