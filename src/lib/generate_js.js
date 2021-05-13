// @ts-check
/**
 * @description The file with the code to generate JS from the
 *     Please lang functions and keywords
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 12/05/2021
 * @module PleaseLangJSGeneration
 */

'use strict';

/**
 * The hash that stores the functions for generating JS
 */
const generateJS = {};

/**
 * The if function
 * @param {string} condition The JS code for the condition
 * @param {string} action1 The action to perform if the condition is fulfilled
 * @param {string} action2 The action to perform if the
 *     condition isn't fulfilled
 * @return {string} The JS code
 */
generateJS.if = (condition, action1, action2) => {
  const result = `if (${condition} !== false) {
    ${action1};
  }`;
  if (action2 == undefined) {
    return result;
  } else {
    return result + ` else {
      ${action2}
    }`;
  }
};

/**
 * The while keyword
 * @param {string} condition The JS code for the condition
 * @param {string} body The body of the while loop
 * @return {string} The JS code
 */
generateJS.while = (condition, body) => {
  return `while (${condition} !== false) {
    ${body}
  }`;
};

/**
 * The for keyword
 * @param {string} initial The JS code for the initialization of the loop
 * @param {string} condition The JS code for the condition
 * @param {string} final The JS code for the final step of each iteration
 * @param {string} body The JS code for the body
 * @return {string} The JS code
 */
generateJS.for = (initial, condition, final, body) => {
  return `for (${initial}; ${condition} !== false; ${final}) {
    ${body}
  }`;
};

/**
 * The foreach keyword
 * @param {string} name The name for the parameter
 * @param {string} iterable A JS code that evaluates to an iterable object
 * @param {string} body The JS code for the body{
 * @return {string} The JS code
 */
generateJS.foreach = (name, iterable, body) => {
  return `${iterable}.forEach((${name}) => {
    ${body}
  });`;
};

/**
 * The run keyword. Runs the code passed as arguments
 * @param {...string} args A list of JS expressions
 * @return {string} The JS code
 */
generateJS.run = generateJS.do = (...args) => {
  let result = '(() => {\n';
  args.slice(0, -1).forEach((arg) => {
    result += arg + ';\n';
  });
  if (args[args.length - 1].startsWith('let ')) {
    result += `${args[args.length - 1]};
      return ${args[args.length - 1].match(/let\s(.*?)\s/)[1]};\n})()`;
  } else {
    result += `return ${args[args.length - 1]};\n})()`;
  }
  return result;
};

/**
 * The let keyword. Allows to create a binding and add it to the scope
 * @param {string} name The name of the variable
 * @param {string} value An expression that evaluates to the value
 * @return {string} The JS code
 */
generateJS.let = generateJS.def = generateJS[':='] = (name, value) => {
  return `let ${name} = ${value}`;
};

/**
 * The fn keyword. Allows to create another function
 * @param {...string} args The args should be a list of parameter names and
 *     then the function body
 * @return {string} The JS code
 */
generateJS.fn = generateJS.function = generateJS['->'] = (...args) => {
  let result = '((';
  args.slice(0, -1).forEach((arg) => {
    result += arg + ',';
  });
  result += ') => {\nreturn ';
  result += args[args.length - 1];
  result += '})';
  return result;
};

/**
 * The assign keyword. Allows to assign a different value to a variable
 * @param {string} variable The name of the variable
 * @param {string} value The value to assign
 * @return {string} The JS code
 */
generateJS.assign = generateJS.set = generateJS['='] = (variable, value) => {
  return `${variable} = ${value}`;
};

/**
 * The object keyword. Allows to create an object
 * @param {...string} args The args should be a list of key and value pairs
 * @return {string} The JS code
 */
generateJS.object = (...args) => {
  let result = '{';
  for (let i = 0; i < args.length; i += 2) {
    if (args[i + 1].startsWith('(function')) {
      result = `${args[i]}: function(...args) {
        let self = this;
        let f = ${args[i + 1]};
        return f(...args);
      },`;
    } else {
      result = `${args[i]}: ${args[i + 1]},`;
    }
  }
  result += '}';
  return result;
};

/**
 * The true value
 * @return {string} The JS code
 */
generateJS.true = () => 'true';

/**
 * The false value
 * @return {string} The JS code
 */
generateJS.false = () => 'false';

/**
 * An undefined value
 * @return {string} The JS code
 */
generateJS.undefined = () => 'undefined';

/**
 * The basic Please operators
 * @return {string} The JS code
 */
['+', '-', '*', '/', '==', '!=', '<', '>', '&&', '||'].forEach((op) => {
  generateJS[op] = (a, b) => `(${a} ${op} ${b})`;
});

/**
 * A function to print a line
 * @param {...*} values The values to be printed
 * @return {string} The JS code
 */
generateJS.println = (...values) => {
  return `(() => {
    let val = [${values}];
    console.log(...val);
    return val;
  })()`;
};

/**
 * A function to create an array
 * @param {...*} args The values of the array
 * @return {string} The JS code
 */
generateJS.arr = generateJS.array = (...args) => {
  return args.toString();
};

/**
 * A function to get the length of an array
 * @param {string} array An array
 * @return {string} The JS code
 */
generateJS.len = generateJS.length = (array) => {
  return `${array}.length`;
};

/**
 * A function to access an element of an array
 * @param {string} array An array
 * @param {...string} indexes The index of the position to be accessed
 * @return {string} The JS code
 */
generateJS.element = (array, ...indexes) => {
  // @ts-ignore
  return `${array}.sub(...${indexes})`;
};

/**
 * A function to create hashes or maps
 * @param {...*} args The arguments are ordered as keys and then
 *     the value for that key
 * @return {string} The JS code
 */
generateJS.map = generateJS.hash = (...args) => {
  let result = '{';
  for (let i = 0; i < args.length; i += 2) {
    result = `${args[i]}: ${args[i + 1]},`;
  }
  result += '}';
  return result;
};

module.exports = {generateJS};
