// @ts-check
/**
 * @description The file with the code to interpret the Please lang
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 8/04/2021
 * @module
 */

'use strict';

const fs = require('fs');
const {parse} = require('./compiler.js');

/**
 * An object with the different base functions of the language
 */
const keywords = Object.create(null);

/**
 * The if function
 * @param {Array} args An array with the arguments, it can have two or three
 *     elements. The first is a condition, the second the action to perform
 *     if the condition evaluates to true and the optional third argument
 *     is the action to perform if the condition evaluates to false
 * @param {Object} scope The scope for executing the if
 * @return {*} What the if evaluates to
 * @throws Will throw if there are syntactical errors
 * @private
 */
keywords.if = (args, scope) => {
  if (args.length > 3 || args.length < 2) {
    throw new SyntaxError('Wrong number of args to if');
  }
  if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
  }
  if (args.length === 3) {
    return evaluate(args[2], scope);
  }
  return false;
};

/**
 * The while keyword
 * @param {Array} args An array with the arguments. It must have length 2.
 *     The first argument is a condition and the body of the while
 * @param {Object} scope The scope for executing the while
 * @return {boolean} A while loop always evaluates to false
 * @throws Will throw if there are syntactical errors
 * @private
 */
keywords.while = (args, scope) => {
  if (args.length !== 2) {
    throw new SyntaxError('Wrong number of arguments to while');
  }
  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }
  return false;
};

/**
 * The run keyword. Runs the code passed as arguments
 * @param {Array} args A list of expressions to run
 * @param {Object} scope The scope
 * @return {*} The return value of the last executed expression
 * @private
 */
keywords.run = (args, scope) => {
  let value = false;
  args.forEach((arg) => {
    value = evaluate(arg, scope);
  });
  return value;
};

/**
 * The let keyword. Allows to create a binding and add it to the scope
 * @param {Array} args The args should be a variable name and a value
 * @param {Object} scope The scope
 * @return {*} The value of the binding
 * @throws Will throw if there are syntactical errors
 * @private
 */
keywords.let = (args, scope) => {
  if (args.length !== 2) {
    throw new SyntaxError('let needs two arguments');
  }
  if (args[0].type !== 'WORD') {
    throw new SyntaxError(
        'The first argument to let must be a valid variable name',
    );
  }
  const value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};

/**
 * The fn keyword. Allows to create another function
 * @param {Array} args The args should be a list of args and then the
 *     function body
 * @param {Object} scope The scope
 * @return {function} The created function
 * @throws Will throw if there are syntactical errors
 * @private
 */
keywords.fn = (args, scope) => {
  if (!args.length) {
    throw new SyntaxError('Functions need a body');
  }
  const body = args[args.length - 1];
  const params = args.slice(0, args.length - 1).map((expr) => {
    if (expr.type !== 'WORD') {
      throw new SyntaxError('Parameter names must be words');
    }
    return expr.name;
  });

  return (...args) => {
    if (args.length !== params.length) {
      throw new TypeError('Wrong number of arguments');
    }
    const localScope = Object.create(scope);
    for (let i = 0; i < args.length; i++) {
      localScope[params[i]] = args[i];
    }
    return evaluate(body, localScope);
  };
};

/**
 * The assign keyword. Allows to assign a different value to a variable
 * @param {Array} args The args should be the name of a variable and a
 *     expression that evaluates to a new value
 * @param {Object} scope The scope
 * @return {function} The value of the new variable
 * @throws Will throw if there are syntactical or semantical errors
 * @private
 */
keywords.assign = (args, scope) => {
  if (args.length !== 2) {
    throw new SyntaxError('Assign needs two arguments');
  }
  if (args[0].type !== 'WORD') {
    throw new SyntaxError(
        'The first argument to assign must be a variable name',
    );
  }
  const varName = args[0].name;
  const value = evaluate(args[1], scope);
  const hasProperty = Object.prototype.hasOwnProperty;
  while (scope != null) {
    if (hasProperty.call(scope, varName)) {
      scope[varName] = value;
      return value;
    }
    scope = Object.getPrototypeOf(scope);
  }
  throw new ReferenceError(
      `Tried to assign to a non existent variable: ${varName}`,
  );
};

/**
 * A function that evaluates an expression
 * @param {Object} tree The expression as a JSON AST
 * @param {Object} scope The scope
 * @return {*} The value of the evaluated expression
 * @throws Will throw if there are semantical errors
 * @private
 */
const evaluate = (tree, scope) => {
  if (tree.type === 'VALUE') {
    return tree.value;
  } else if (tree.type === 'WORD') {
    if (tree.name in scope) {
      return scope[tree.name];
    } else {
      throw new ReferenceError(`Undefined binding: ${tree.name}`);
    }
  } else if (tree.type === 'CALL') {
    const {operator, args} = tree;
    if (operator.type === 'WORD' &&
        operator.name in keywords) {
      return keywords[operator.name](tree.args, scope);
    } else {
      const op = evaluate(operator, scope);
      if (typeof op === 'function') {
        return op(...args.map((arg) => evaluate(arg, scope)));
      } else {
        throw new TypeError('Calling a non-function.');
      }
    }
  }
};

/**
 * A function that creates the top scope
 * @return {Object} The value of the initial scope
 * @private
 */
const createTopScope = () => {
  const topScope = Object.create(null);
  topScope.true = true;
  topScope.false = false;
  ['+', '-', '*', '/', '==', '!=', '<', '>', '&&', '||'].forEach((op) => {
    topScope[op] = Function('a, b', `return a ${op} b;`);
  });
  topScope.println = (value) => {
    console.log(value);
    return value;
  };
  return topScope;
};

/**
 * A function that interprets a Please JSON AST
 * @param {Object} program The AST of the program to interpret
 * @return {*} The return value of the program
 * @throws Will throw if there are syntactical errors
 */
const interpret = (program) => {
  return evaluate(program, createTopScope());
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
  createTopScope,
  keywords,
  evaluate,
};
