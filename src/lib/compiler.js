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
    /** @property {Object} @private */
    this.cachedToken_ = undefined;
    /** @const {number} @private */
    this.line_ = 1;
    /** @const {number} @private */
    this.column_ = 1;
    /** @const {number} @private */
    this.offset_ = 0;
    /** @const {number} @private */
    this.parenthesis_count_ = 0;
    /** @const {RegExp} @private */
    this.WHITE_ = /^(?:\s|\/\/.*|\/\*(?:.|\n)*?\*\/)*/,
    /** @const {RegExp} @private */
    this.REGEXP_ = new RegExp(
        [
          /(?<STRING>(["'])(?:[^\1\\]|\\.)*?\1)/,
          /(?<NUMBER>[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)/,
          /(?<WORD>[^\s(),"'\\]+)/,
          /(?<COMMA>,)/,
          /(?<LEFT_PARENTHESIS>\()/,
          /(?<RIGHT_PARENTHESIS>\))/,
        ].map((regexp) => regexp.source).join('|'),
        'y',
    );
  }

  /**
   * A method that returns the next token of the source
   * @return {object} The next token
 * @throws Will throw if there are invalid tokens
   */
  nextToken() {
    if (this.cachedToken_ != undefined) {
      return this.cachedToken_;
    }
    this.skipSpace_();
    if (this.isEmpty()) {
      throw new SyntaxError('Unexpected EOF');
    }
    let match = this.REGEXP_.exec(this.source_);
    if (match == null) {
      match = /..*?\b|.*$/.exec(this.source_.slice(this.REGEXP_.lastIndex));
      throw new SyntaxError(
          `Invalid token: ${match[0]} ` +
          `at line ${this.line_} and column ${this.column_}`,
      );
    }
    const result = this.constructResult_(match);
    this.checkValidToken_(result.type);
    result.offset = this.offset_;
    result.line = this.line_;
    result.column = this.column_;
    this.updateAfterMatch_(match.groups[result.type]);
    this.cachedToken_ = result;
    return result;
  }

  /**
   * A helper function that construct the result from the match
   * @param {Object} match The string that matched with the RegExp
   * @return {Object} The constructed result
   * @private
   */
  constructResult_(match) {
    const result = {};
    result.type = Object.keys(match.groups)
        .find((type) => match.groups[type] !== undefined);
    if (result.type === 'WORD') {
      result.name = match.groups[result.type];
    } else if (result.type === 'NUMBER') {
      result.value = Number(match.groups[result.type]);
    } else {
      result.value = match.groups[result.type];
    }
    return result;
  }

  /**
   * A function that check that the token is a valid one
   *    In particular it allows to avoid ')' and ',' after
   *    the end of the program
   * @param {string} type The type of the token
   */
  checkValidToken_(type) {
    if (type === 'LEFT_PARENTHESIS') {
      this.parenthesis_count_++;
    } else if (type === 'RIGHT_PARENTHESIS') {
      this.parenthesis_count_--;
      if (this.parenthesis_count_ < 0) {
        throw new SyntaxError(
            `Unmatched parenthesis ` +
            `at line ${this.line_} and column ${this.column_}`,
        );
      }
    } else if (type === 'COMMA' && this.parenthesis_count_ === 0) {
      throw new SyntaxError(
          `Unexpected comman after end of program ` +
          `at line ${this.line_} and column ${this.column_}`,
      );
    }
  }

  /**
   * A method that consomes the next token so a new one is available
   */
  consumeToken() {
    this.cachedToken_ = undefined;
  }

  /**
   * A function to update the lexer after consuming a token
   * @param {string} token The token found
   * @private
   */
  updateAfterMatch_(token) {
    const lineStart = this.source_.lastIndexOf('\n', this.offset_);
    this.column_ = this.offset_ - (lineStart >= 0 ? lineStart : 0) + 1;
    this.offset_ += token.length;
    this.line_ += token.split(/\n/).length - 1;
  }

  /**
   * A function to check if there are more tokens in the input
   * @return {boolean} Whether is it empty or not
   */
  isEmpty() {
    return this.source_.length === this.offset_;
  }

  /**
   * A function that deletes starting whites from the source
   * @private
   */
  skipSpace_() {
    const match = this.WHITE_.exec(this.source_.slice(this.offset_));
    this.REGEXP_.lastIndex += match[0].length;
    this.updateAfterMatch_(match[0]);
  };
}


/**
 * A function that parses an expression
 * @param {Lexer} lexer An instance of the Lexer class initialized with
 *     the source of the program
 * @return {Object} The JSON AST of the expression
 * @throws Will throw if there are syntactical errors
 * @private
 */
const parseExpression = (lexer) => {
  const token = lexer.nextToken();
  lexer.consumeToken();
  if (token.type === 'WORD') {
    return parseCall(token, lexer);
  }
  if (token.type === 'STRING' || token.type === 'NUMBER') {
    token.type = 'VALUE';
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
 * @throws Will throw if there are syntactical errors
 * @private
 */
const parseCall = (ast, lexer) => {
  if (lexer.isEmpty()) {
    return ast;
  }
  let token = lexer.nextToken();
  if (token.type === 'RIGHT_PARENTHESIS' || token.type === 'COMMA') {
    return ast;
  }
  if (token.type !== 'LEFT_PARENTHESIS') {
    throw new SyntaxError(
        `Unexpected token: ${token.value} at line` +
        ` ${token.line} and column ${token.column}, expected '('`,
    );
  }
  lexer.consumeToken();
  ast = {type: 'CALL', operator: ast, args: []};
  token = lexer.nextToken();
  while (token.type !== 'RIGHT_PARENTHESIS') {
    const arg = parseExpression(lexer);
    ast.args.push(arg);
    token = lexer.nextToken();
    if (token.type === 'COMMA') {
      lexer.consumeToken();
      token = lexer.nextToken();
    } else if (token.type !== 'RIGHT_PARENTHESIS') {
      throw new SyntaxError(
          `Expected ',' or ')' at line ${token.line} ` +
          `and column ${token.column}`,
      );
    }
  }
  lexer.consumeToken();
  return parseCall(ast, lexer);
};

/**
 * A function that parses a Please program
 * @param {string} program The string with the unparsed program
 * @return {Object} The AST of the program
 * @throws Will throw if there are errors in the program
 */
const parse = (program) => {
  const lexer = new Lexer(program);
  const ast = parseExpression(lexer);
  return ast;
};

/**
 * A function that reads a file and parses its contents
 * @param {string} fileName The name of the file
 * @return {Object} The JSON AST of the program
 * @throws Will throw if there are errors in the program or if the file
 *     can't be opened
 */
const parseFromFile = (fileName) => {
  const source = fs.readFileSync(fileName, 'utf8');
  return parse(source);
};

/**
 * A function that compiles a Please file
 * @param {string} origin The name of the origin file
 * @param {string} destination The name of the destination file
 * @throws Will throw if there are errors in the program or if the files
 *     can't be opened
 */
const compile = (origin, destination = undefined) => {
  const source = fs.readFileSync(origin, 'utf8');
  if (destination == undefined) {
    destination = origin.match(/^[^\.]*/)[0] + '.cpls';
  }
  const ast = JSON.stringify(parse(source), null, 2);
  fs.writeFileSync(destination, ast);
};

module.exports = {parse, parseCall, parseExpression, parseFromFile, compile};
