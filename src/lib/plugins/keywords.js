// @ts-check
/**
 * @description The file with the keywords of the Please lang
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 22/04/2021
 * @module PleaseLangKeywords
 */

'use strict';

const {keywords, Word} = require('../ast.js');

/**
 * The if function
 * @param {Array} args An array with the arguments, it can have two or three
 *     elements. Each element must be an AST node. The first is a condition,
 *     the second the action to perform if the condition evaluates to true
 *     and the optional third argument is the action to perform if the
 *     condition evaluates to false
 * @param {Object} scope The scope for executing the if
 * @return {*} What the if evaluates to
 * @throws Will throw if there are syntactical errors
 */
keywords.if = (args, scope) => {
  if (args.length > 3 || args.length < 2) {
    throw new SyntaxError('Wrong number of args to if');
  }
  if (args[0].evaluate(scope) !== false) {
    return args[1].evaluate(scope);
  }
  if (args.length === 3) {
    return args[2].evaluate(scope);
  }
};

/**
 * The while keyword
 * @param {Array} args An array with the arguments. It must have length 2.
 *     The first argument is a condition and the body of the while. Both
 *     must AST nodes
 * @param {Object} scope The scope for executing the while
 * @throws Will throw if there are syntactical errors
 */
keywords.while = (args, scope) => {
  if (args.length !== 2) {
    throw new SyntaxError('Wrong number of arguments to while');
  }
  while (args[0].evaluate(scope) !== false) {
    args[1].evaluate(scope);
  }
};

/**
 * The run keyword. Runs the code passed as arguments
 * @param {Array} args A list of expression nodes to run
 * @param {Object} scope The scope
 * @return {*} The return value of the last executed expression
 */
keywords.run = keywords.do = (args, scope) => {
  let value = false;
  args.forEach((arg) => {
    value = arg.evaluate(scope);
  });
  return value;
};

/**
 * The let keyword. Allows to create a binding and add it to the scope
 * @param {Array} args The args should be a variable name and a value
 * @param {Object} scope The scope
 * @return {*} The value of the binding
 * @throws Will throw if there are syntactical errors
 */
keywords.let = keywords.def = keywords[':='] = (args, scope) => {
  if (args.length !== 2) {
    throw new SyntaxError('let needs two arguments');
  }
  if (!(args[0] instanceof Word)) {
    throw new SyntaxError(
        'The first argument to let must be a valid variable name',
    );
  }
  const value = args[1].evaluate(scope);
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
 */
keywords.fn = keywords.function = keywords['->'] = (args, scope) => {
  if (!args.length) {
    throw new SyntaxError('Functions need a body');
  }
  const body = args[args.length - 1];
  const params = args.slice(0, args.length - 1).map((expr) => {
    if (!(expr instanceof Word)) {
      throw new SyntaxError('Parameter names must be words');
    }
    return expr.getName();
  });

  return (...args) => {
    if (args.length !== params.length) {
      throw new TypeError('Wrong number of arguments');
    }
    const localScope = Object.create(scope);
    for (let i = 0; i < args.length; i++) {
      localScope[params[i]] = args[i];
    }
    return body.evaluate(localScope);
  };
};

/**
 * The assign keyword. Allows to assign a different value to a variable
 * @param {Array} args The args should be the name of a variable, a list of
 *     indexes and a expression that evaluates to a new value
 * @param {Object} scope The scope
 * @return {function} The value of the new variable
 * @throws Will throw if there are syntactical or semantical errors
 */
keywords.assign = keywords.set = keywords['='] = (args, scope) => {
  if (args.length < 2) {
    throw new SyntaxError('Assign needs at least two arguments');
  }
  if (!(args[0] instanceof Word)) {
    throw new SyntaxError(
        'The first argument to assign must be a variable name',
    );
  }
  const varName = args[0].getName();
  const indexes = args.slice(1, -1).map((arg) => {
    return arg.evaluate(scope);
  });
  const value = args[args.length - 1].evaluate(scope);
  const hasProperty = Object.prototype.hasOwnProperty;
  while (scope != null) {
    if (hasProperty.call(scope, varName)) {
      if (indexes.length === 0) {
        scope[varName] = value;
      } else {
        scope[varName]['='](value, ...indexes);
      }
      return value;
    }
    scope = Object.getPrototypeOf(scope);
  }
  throw new ReferenceError(
      `Tried to assign to a non existent variable: ${varName}`,
  );
};

/**
 * The object keyword. Allows to create an object
 * @param {Array} args The args should be a list of key and value pairs
 * @param {Object} scope The scope
 * @return {object} The created object
 * @throws Will throw if there are syntactical or semantical errors
 */
keywords.object = (args, scope) => {
  if (args.length % 2 !== 0) {
    throw new Error(
        'To create an object the number of arguments must be a multiple of two',
    );
  }
  const objectEnv = Object.create(scope);
  const object = Object.create(objectEnv);
  objectEnv.self = object;
  for (const key of Object.keys(Object.prototype)) {
    objectEnv[key] = Object.prototype[key];
  };
  for (let i = 0; i < args.length; i += 2) {
    const name = typeof args[i].getName === 'function' ?
       args[i].getName() : args[i].evaluate(object);
    const value = args[i + 1].evaluate(object);
    object[name] = value;
  }
  return object;
};

module.exports = {keywords};
