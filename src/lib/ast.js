// @ts-check
/**
 * @description The file with the classes representing the different
 *     node types of the AST
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 27/04/2021
 * @module PleaseLangAST
 */

'use strict';

const XRegExp = require('xregexp');

/**
 * An object with the different keywords of the language
 */
const keywords = Object.create(null);

/**
 * A class representing a value. Can be a String or a Number
 */
class Value {
  /**
   * The constructor
   * @param {object} token A single token of type string or number
   */
  constructor(token) {
    this.type = 'Value';
    this.value = token.value;
  }

  /**
   * Evaluate the node
   * @return {string|number} The result of the evaluation
   */
  evaluate() {
    return this.value;
  }
}

/**
 * A class representing a word
 */
class Word {
  /**
   * The constructor
   * @param {object} token A single token of type word
   */
  constructor(token) {
    this.type = 'Word';
    this.name = token.name;
  }

  /**
   * Evaluate the node
   * @param {object} scope The scope in which the node will be evaluated
   * @return {*} The result of the evaluation
   */
  evaluate(scope) {
    if (this.name in scope) {
      return scope[this.name];
    } else {
      throw new ReferenceError(`Undefined binding: ${this.name}`);
    }
  }

  /**
   * Checks if the word is a keyword
   * @param {object} keywords The set of keywords
   * @return {boolean} Whether this instance is a keyword or not
   */
  isKeyword(keywords) {
    return this.name in keywords;
  }

  /**
   * Getter
   * @return {string} The inner value of the word
   */
  getName() {
    return this.name;
  }
}

/**
 * A class representing a regular expression
 */
class REGEXP {
  /**
   * The constructor
   * @param {object} token A single token of type regexp
   */
  constructor(token) {
    this.type = 'RegExp';
    this.expression = token.value.slice(2, token.value.lastIndexOf('/'));
    this.flags = token.value.slice(token.value.lastIndexOf('/') + 1);
  }

  /**
   * Evaluate the node
   * @param {object} scope The scope in which the node will be evaluated
   * @return {*} The result of the evaluation
   */
  evaluate(scope) {
    // eslint-disable-next-line new-cap
    return XRegExp(this.expression, this.flags);
  }
}

/**
 * A class representing a call
 */
class Call {
  /**
   * The constructor
   * @param {object} operator A node representing the operator. Should
   *     evaluate to a function or a Word with the value of a keyword
   * @param {Array} args An array of nodes representing the arguments.
   *     Should be filled with nodes that evaluate to arbitrary values
   */
  constructor(operator, args) {
    this.type = 'Call';
    this.operator = operator;
    this.args = args;
  }

  /**
   * Evaluate the node
   * @param {object} scope The scope in which the node will be evaluated
   * @return {*} The result of the evaluation
   */
  evaluate(scope) {
    if (this.operator instanceof Word &&
        this.operator.isKeyword(keywords)) {
      return keywords[this.operator.getName()](this.args, scope);
    } else {
      const op = this.operator.evaluate(scope);
      if (typeof op === 'function') {
        return op(...this.args.map((arg) => arg.evaluate(scope)));
      } else {
        throw new TypeError('Calling a non-function.');
      }
    }
  }
}

/**
 * A class representing a method call
 */
class MethodCall {
  /**
   * The constructor
   * @param {object} operator A node representing the operator. Should
   *     evaluate to a function or a Word with the value of a keyword
   * @param {Array} args An array of nodes representing the arguments.
   *     Should be filled with nodes that evaluate to arbitrary values
   */
  constructor(operator, args) {
    this.type = 'MethodCall';
    this.operator = operator;
    this.args = args;
  }

  /**
   * Evaluate the node
   * @param {object} scope The scope in which the node will be evaluated
   * @return {*} The result of the evaluation
   */
  evaluate(scope) {
    const op = this.operator.evaluate(scope);
    if (op == undefined) {
      return undefined;
    }
    const processedArgs = this.args.map((arg) => arg.evaluate(scope));
    const methodName = processedArgs.shift().toString();
    if (typeof op[methodName] !== 'function') {
      return op[methodName];
    }
    return (...args) => op[methodName](...processedArgs, ...args);
  }
}

module.exports = {Value, Word, REGEXP, Call, MethodCall, keywords};
