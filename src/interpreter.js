// @ts-check
/**
 * @description The file with the code to compile the Please lang
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 8/04/2021
 */

/**
 * An object with the different base functions of the language
 */
const predefinedFunctions = {};

/**
 * The if function
 * @param {Array} args An array with the arguments, it can have two or three
 *     elements. The first is a condition, the second the action to perform
 *     if the condition evaluates to true and the optional third argument
 *     is the action to perform if the condition evaluates to false
 * @param {Object} scope The scope for executing the if
 * @return {*} What the if evaluates to
 * @private
 */
predefinedFunctions.if = (args, scope) => {
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
 * The while function
 * @param {Array} args An array with the arguments. It must have length 2.
 *     The first argument is a condition and the body of the while
 * @param {Object} scope The scope for executing the while
 * @return {boolean} A while loop always evaluates to false
 * @private
 */
predefinedFunctions.while = (args, scope) => {
  if (args.length !== 2) {
    throw new SyntaxError('Wrong number of args to while');
  }
  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }
  return false;
};

/**
 * The run function. Runs the code passed as arguments
 * @param {Array} args A list of expressions to run
 * @param {Object} scope The scope
 * @return {*} The return value of the last executed expression
 * @private
 */
predefinedFunctions.run = (args, scope) => {
  let value = false;
  args.forEach((arg) => {
    value = evaluate(arg, scope);
  });
  return value;
};

/**
 * The let function. Allows to create a binding and add it to the scope
 * @param {Array} args The args should be a variable name and a value
 * @param {Object} scope The scope
 * @return {*} The value of the binding
 * @private
 */
predefinedFunctions.let = (args, scope) => {
  if (args.length !== 2 || args[0].type !== 'word') {
    throw new SyntaxError('Incorrect use of let');
  }
  const value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};

/**
 * The fn function. Allows to create another function
 * @param {Array} args The args should be a list of args and then the
 *     function body
 * @param {Object} scope The scope
 * @return {function} The created function
 * @private
 */
predefinedFunctions.fn = (args, scope) => {
  if (!args.length) {
    throw new SyntaxError('Functions need a body');
  }
  const body = args[args.length - 1];
  const params = args.slice(0, args.length - 1).map((expr) => {
    if (expr.type !== 'word') {
      throw new SyntaxError('Parameter names must be words');
    }
    return expr.name;
  });

  return function(...args) {
    if (args.length !== params.length) {
      throw new TypeError('Wrong number of arguments');
    }
    const localScope = Object.create(scope);
    for (let i = 0; i < arguments.length; i++) {
      localScope[params[i]] = args[i];
    }
    return evaluate(body, localScope);
  };
};

/**
 * A function that evaluates an expression
 * @param {Object} expr The expression as a JSON AST
 * @param {Object} scope The scope
 * @return {*} The value of the evaluated expression
 * @private
 */
const evaluate = (expr, scope) => {
  if (expr.type === 'value') {
    return expr.value;
  } else if (expr.type === 'word') {
    if (expr.name in scope) {
      return scope[expr.name];
    } else {
      throw new ReferenceError(`Undefined binding: ${expr.name}`);
    }
  } else if (expr.type === 'call') {
    const {operator, args} = expr;
    if (operator.type === 'word' &&
        operator.name in predefinedFunctions) {
      return predefinedFunctions[operator.name](expr.args, scope);
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
  const topScope = {};
  topScope.true = true;
  topScope.false = false;
  ['+', '-', '*', '/', '==', '<', '>'].forEach((op) => {
    topScope[op] = Function('a, b', `return a ${op} b;`);
  });
  topScope.print = (value) => {
    console.log(value);
    return value;
  };
  return topScope;
};

/**
 * A function that interprets a Please JSON AST
 * @param {Object} program The program to interpret
 * @return {*} The return value of the program
 */
const interpret = (program) => {
  return evaluate(program, createTopScope());
};

module.exports = interpret;
