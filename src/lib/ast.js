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
const {generateJS} = require('./generate_js.js');

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

  /**
   * Convert the node to JS
   * @return {string} The result of the convertion
   */
  toJS() {
    if (typeof this.value === 'string') {
      return `${JSON.stringify(this.value)}`;
    }
    return this.value.toString();
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

  /**
   * Convert the node to JS
   * @return {string} The result of the convertion
   */
  toJS() {
    if (generateJS[this.name] != undefined) {
      return generateJS[this.name]();
    }
    return '$' + this.name;
  }
}

/**
 * A class representing a regular expression
 */
class REGEXP {
  /**
   * The constructor
   * @param {object} expression The representation of the regular expression
   * @param {object} flags The regular expression flags
   */
  constructor(expression, flags) {
    this.type = 'RegExp';
    this.expression = expression;
    this.flags = flags;
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

  /**
   * Convert the node to JS
   * @return {string} The result of the convertion
   */
  toJS() {
    return `$XRegExp(\`${this.expression.replace(/\\/g, '\\\\')}` +
        `\`, \`${this.flags}\`)`;
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

  /**
   * Convert the node to JS
   * @return {string} The result of the convertion
   */
  toJS() {
    if (['=', 'set', 'assign'].includes(this.operator.name) &&
       this.args[0].type === 'MethodCall' && this.args.length === 2) {
      return this.assignmentToJS();
    }
    const previousDeclarations = generateJS.declarations;
    generateJS.declarations = [];
    const args = this.args.map((arg) => arg.toJS());
    let result;
    if (this.operator instanceof Word &&
        generateJS[this.operator.name] != undefined) {
      result = generateJS[this.operator.name](...args);
    } else {
      result = this.operator.toJS() + '(' + args.join(',') + ')';
    }
    previousDeclarations.forEach((declaration) => {
      generateJS.declarations.push(declaration);
    });
    return result;
  }

  /**
   * Convert an assignment to JS
   * @return {string} The result of the convertion
   */
  assignmentToJS() {
    let result = '';
    const keys = [];
    let operator = this.args[0];
    while (operator.type !== 'Word') {
      keys.push(operator.args[0].toJS());
      operator = operator.operator;
    }
    const object = operator.toJS();
    result += keys.map((key, i) => `var a${i} = ${key};`).join('\n');
    result += `var obj = ${object};\n`;
    result += 'if (';
    let accesses = '';
    for (let i = keys.length - 1; i >= 0; i--) {
      accesses += '[a' + i + ']';
      if (i !== 0) {
        result += `obj${accesses} != undefined && `;
      }
    }
    result = result.slice(0, -3) + ') {\n';
    result += `obj${accesses} = ${this.args[1].toJS()};\n}`;
    return result;
  }
}

/**
 * A class representing a reference. It helps to evaluate the left hand side
 */
class Reference {
  /**
   * The constructor
   * @param {Object} object The object
   * @param {*} key The key that allows to access the real reference
   */
  constructor(object, key) {
    this.object = object;
    this.key = key;
  }

  /**
   * Change the value the reference points to
   * @param {*} value The value for the assignment
   */
  assign(value) {
    this.object[this.key] = value;
  }

  /**
   * Allows to get the value of the reference
   * @return {*} The value inside
   */
  evaluate() {
    return this.object[this.key];
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
   * Evaluate the node for an assignment
   * @param {object} scope The scope in which the node will be evaluated
   * @return {*} The result of the evaluation
   */
  leftEvaluate(scope) {
    const methodName = this.args[0].evaluate(scope);
    let op;
    if (this.operator instanceof MethodCall) {
      op = this.operator.leftEvaluate(scope);
      if (op == undefined) {
        return undefined;
      }
      op = op.evaluate(scope);
    } else {
      op = this.operator.evaluate(scope);
    }
    if (op == undefined) {
      return undefined;
    }
    return new Reference(op, methodName);
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

  /**
   * Convert the node to JS
   * @return {string} The result of the convertion
   */
  toJS() {
    const operator = this.operator.toJS();
    const name = this.args[0].toJS();
    const args = this.args.slice(1).map((arg) => arg.toJS());
    return `(() => {
      let name = ${name};
      let op = ${operator};
      let processedArgs = [${args}];
      if (op == undefined) {
        return undefined;
      }
      if (typeof op[name] !== 'function') {
        return op[name];
      }
      return (...args) => op[name](...processedArgs, ...args);
    })()`;
  }
}

module.exports = {Value, Word, REGEXP, Call, MethodCall, keywords};
