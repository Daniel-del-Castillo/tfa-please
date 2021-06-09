/* eslint-disable max-len */
// @ts-nocheck
/**
 * @description The file with the code to optimize Please lang compiled version
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 1/06/2021
 * @module PleaseLangOptimizations
 */

'use strict';

const {replace, VisitorOption} = require('estraverse');
const {Value, Call, Word} = require('./ast');
const {operators, topScope} = require('./plugins/top-scope.js');

/**
 * A helper to register the variables that haven't changed and the functions that are able
 *     to change those variables
 */
let constantVariables;

/**
 * A helper to register the depth in function definitions
 */
let depth;

/**
 * A helper to register functions and which variables they change
 */
let functions;

/**
 * Optimizes an ast
 * @param {Object} ast The ast of the Please program to optimize
 * @return {Object} The optimized ast
 */
const optimize = (ast) => {
  constantVariables = [Object.create(null)];
  depth = 0;
  functions = [];
  return replace(ast, {
    enter: registerScopeChangesOnEnter,
    leave: (node, parent) => {
      const fold = constantFolding(node);
      const propagation = constantPropagation(node, parent);
      return fold || propagation;
    },
    fallback: (node) => {
      return Object.keys(node).filter((key) => {
        return !['type', 'value', 'name', 'expression', 'flags'].includes(key);
      });
    },
  });
};

/**
 * Tries to apply constant folding to a node
 * @param {Object} node The node to fold
 * @return {Object} A new Value node if it was possible to fold or undefined
 */
const constantFolding = (node) => {
  if (node instanceof Call && operators.includes(node.operator.name) &&
      node.args[0] instanceof Value && node.args[1] instanceof Value) {
    return new Value({value: node.evaluate(topScope)});
  }
  return undefined;
};

/**
 * Tries to apply constant propagation to a node
 * @param {Object} node The node
 * @param {Object} parent The parent of the node
 * @return {Object} A new Value node if it was possible to propagate a
 *     constant or undefined
 */
const constantPropagation = (node, parent) => {
  registerScopeChangesOnLeave(node, parent);
  registerVariableChanges(node);
  registerVariables(node);
  if (node instanceof Word && node.name in constantVariables[depth] &&
      !(constantVariables[depth][node.name] instanceof Array) &&
      !(parent instanceof Call && parent.operator instanceof Word &&
      ['assign', 'set', '='].includes(parent.operator.name) &&
      parent.args[0] === node)) {
    return new Value({value: constantVariables[depth][node.name]});
  }
  return undefined;
};

/**
 * Checks if a new scope has been entered and acts accordingly
 * @param {Object} node The node
 * @param {Object} parent The parent of the node
 * @return {VisitorOption} Might return VisitorOption.Skip para evitar el nodo
 */
const registerScopeChangesOnEnter = (node, parent) => {
  if (node instanceof Call && node.operator instanceof Word &&
      ['run', 'do'].includes(node.operator.name)) {
    addScope();
  } else if ((node instanceof Call && node.operator instanceof Word &&
      (['foreach', 'for', 'while'].includes(node.operator.name) ||
      (['fn', 'function', '->'].includes(node.operator.name) &&
      parent instanceof Call && parent.operator instanceof Word &&
      ['let', 'def', ':=', 'assign', 'set', '='].includes(parent.operator.name) &&
      parent.args[0] instanceof Word))) ||
      (parent instanceof Call && parent.operator instanceof Word &&
      parent.operator.name === 'for' && parent.args[1] === node)) {
    addSeparatedScope();
  } else if (node instanceof Call && !(node.operator instanceof Word ||
      (node.operator instanceof Call && node.operator.operator instanceof Word &&
      ['fn', 'function', '->'].includes(node.operator.operator.name)))) {
    resetConstants();
    return VisitorOption.Skip;
  }
};

/**
 * Checks if a new scope has been left and acts accordingly
 * @param {Object} node The node to check
 * @param {Object} parent The parent of the node
 */
const registerScopeChangesOnLeave = (node, parent) => {
  if (node instanceof Call && node.operator instanceof Word &&
      ['run', 'do'].includes(node.operator.name)) {
    removeScope();
  } else if (node instanceof Call && node.operator instanceof Word &&
      ['foreach', 'for', 'while'].includes(node.operator.name)) {
    removeSeparatedScope();
    if (node.operator.name === 'for') {
      removeSeparatedScope();
    }
  } else if (node instanceof Call && node.operator instanceof Word &&
      ['fn', 'function', '->'].includes(node.operator.name) &&
      parent instanceof Call && parent.operator instanceof Word &&
      ['let', 'def', ':=', 'assign', 'set', '='].includes(parent.operator.name) &&
      parent.args[0] instanceof Word) {
    if (['let', 'def', ':='].includes(parent.operator.name)) {
      addNewFunction(parent.args[0].name);
    } else {
      addChangesToFunction(parent.args[0].name);
    }
  }
};

/**
 * Checks if a node declares a new variable and, if it is the case,
 *     registers the new variable
 * @param {Object} node The node to check
 */
const registerVariables = (node) => {
  if (node instanceof Call && node.operator instanceof Word &&
      ['let', 'def', ':='].includes(node.operator.name) &&
      node.args[0] instanceof Word && node.args[1] instanceof Value) {
    constantVariables[depth][node.args[0].name] = node.args[1].value;
  }
};

/**
 * Checks if a node is changing a variable and deletes that variables
 *     from the constantVariables list
 * @param {Object} node The node to check
 */
const registerVariableChanges = (node) => {
  if (node instanceof Call && node.operator instanceof Word &&
      ['assign', 'set', '='].includes(node.operator.name) &&
      node.args[0] instanceof Word) {
    removeConstant(node.args[0].name);
  } else if (node instanceof Call && node.operator instanceof Word) {
    const hasProperty = Object.prototype.hasOwnProperty;
    let scope = constantVariables[depth];
    const name = node.operator.name;
    while (scope != null) {
      if (hasProperty.call(scope, name)) {
        if (scope[name] instanceof Array) {
          scope[name].map((name) => removeConstant(name));
        }
        return;
      }
      scope = Object.getPrototypeOf(scope);
    }
  }
};

/**
 * Removes a constant from the list of constants or adds the name to
 *     the list of variables changed by the function if modifying an outside
 *     variable from a function
 * @param {string} name The name of the constant
 */
const removeConstant = (name) => {
  const hasProperty = Object.prototype.hasOwnProperty;
  let scope = constantVariables[depth];
  while (scope != null) {
    if (hasProperty.call(scope, name)) {
      if (!(scope[name] instanceof Array)) {
        delete scope[name];
      }
      return;
    }
    scope = Object.getPrototypeOf(scope);
  }
  if (functions.length !== 0) {
    functions[functions.length - 1].push(name);
  }
};

/**
 * Removes all the constants from the list
 */
const resetConstants = () => {
  for (let i = 0; i < constantVariables.length; i++) {
    let scope = constantVariables[i];
    while (scope != null) {
      Object.keys(scope).forEach((key) => delete scope[key]);
      scope = Object.getPrototypeOf(scope);
    }
  }
};

/**
 * Adds a new scope. Used when entering a run block, for example
 */
const addScope = () => {
  constantVariables[depth] = Object.create(constantVariables[depth]);
};

/**
 * Adds a new separated scope. Used when entering an fn block, for example.
 *     It is separated in the sense that outside variables can't be propagated
 *     inside the function
 */
const addSeparatedScope = () => {
  constantVariables.push(Object.create(null));
  functions.push([]);
  depth += 1;
};

/**
 * Removes a scope. Used when leaving a run block, for example.
 */
const removeScope = () => {
  constantVariables[depth] = Object.getPrototypeOf(constantVariables[depth]);
};

/**
 * Removes a separated scope. Used when leaving an fn block, for example.
 */
const removeSeparatedScope = () => {
  constantVariables.pop();
  depth -= 1;
  functions.pop().map((name) => removeConstant(name));
};

/**
 * Takes the variables changed by the current function and stores it with
 *     the name of the function
 * @param {string} name The name of the new function
 */
const addNewFunction = (name) => {
  constantVariables.pop();
  const functionChanges = functions.pop();
  depth -= 1;
  constantVariables[depth][name] = functionChanges;
};

/**
 * Takes the variables changed by the current function and adds them to
 *     the list of variable change by a function.
 * @param {string} name The name of the function
 */
const addChangesToFunction = (name) => {
  constantVariables.pop();
  const functionChanges = functions.pop();
  depth -= 1;
  const hasProperty = Object.prototype.hasOwnProperty;
  for (let i = 0; i <= depth; i++) {
    let scope = constantVariables[depth - i];
    while (scope != null) {
      if (hasProperty.call(scope, name)) {
        if (scope[name] instanceof Array) {
          scope[name] = scope[name].concat(functionChanges);
        } else {
          scope[name] = functionChanges;
        }
        break;
      }
      scope = Object.getPrototypeOf(scope);
    }
  }
};

module.exports = {optimize};
