// @ts-check
/**
 * @description A file with the tests for Please lang interpreter
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 15/04/2021
 */

'use strict';

const should = require('chai').should();
const {runFromFile} = require('../src/main.js');
const sinon = require('sinon');

describe('Interpreter', () => {
  const basePath = 'test/pls/';
  const result = [];
  let logStub;

  beforeEach(() => {
    logStub = sinon.stub(console, 'log');
    logStub.callsFake((arg) => result.push(arg));
  });

  afterEach(() => {
    result.splice(0, result.length);
    logStub.restore();
  });

  const testList = [
    {name: 'fixing-scope', result: 50},
    {name: 'while', result: 2},
    {name: 'if', result: 5},
    {name: 'if-else', result: 10},
    {name: 'false-if', result: 2},
    {name: 'method-undefined', result: true},
  ];

  const runTest = (test) => {
    it(test.name, () => {
      runFromFile(basePath + test.name + '.pls').should.eql(test.result);
    });
  };

  testList.forEach((test) => {
    runTest(test);
  });

  const logTestList = [
    {name: 'array', result: [[1, 4], 3, 3]},
    {name: 'array-sum', result: ['sum(array(1, 2, 3)) := 6']},
    {name: 'println', result: ['Hello world\nHello']},
    {name: 'method-example', result: [5, '4.00']},
    {name: 'array-properties', result: [1, [5, 3], 3]},
    {name: 'js-methods', result: ['HELLO']},
    {name: 'map', result: [[2, 3, 4, 5]]},
    {name: 'sub', result: [4, 4]},
    {name: '=', result: [[[1, 5], [3, 4]]]},
    {name: 'currying', result: [12]},
    {name: 'undefined-sub', result: [undefined]},
    {name: 'operation-methods', result: [1, 2, 12]},
    {name: 'negative-indexes', result: [[2, 3]]},
    {name: 'multilevel-assign', result: [[1, 9, [1000]]]},
    {name: 'hash', result: [3, {'x': 4, 'y': {'z': 50}}, {'z': 50}]},
    {name: 'hash-colon', result: [3, {'x': 4, 'y': {'z': 50}}, {'z': 50}]},
    {name: 'sub-in-hash', result: [1, 5, 3, 4]},
    {name: 'object', result: [0, 4, 5, 5]},
    {name: 'dot-operator', result: [0, 0, 0, 5, 9]},
    {name: 'regexp', result: [true, ['a 42', 'a', '42']]},
    {name: 'regexp2', result: [true, '1987-07-14', 0, '2015', '02']},
  ];

  const runLogTest = (test) => {
    it(test.name, () => {
      runFromFile(basePath + test.name + '.pls');
      result.should.eql(test.result);
    });
  };

  logTestList.forEach((test) => {
    runLogTest(test);
  });
});

describe('Interpreter errors', () => {
  const basePath = 'test/pls/interpreter-errors/';

  const testList = [
    {name: 'if-args-number', error: /Wrong number of arg/},
    {name: 'while-args-number', error: /Wrong number of arg/},
    {name: 'let-two-args', error: /let needs two arguments/},
    {name: 'first-let-arg', error: /The first argument to let/},
    {name: 'fn-needs-body', error: /Functions need a body/},
    {name: 'parameter-names', error: /Parameter names/},
    {name: 'fn-wrong-arg-numbers', error: /Wrong number of arg/},
    {name: 'assign-two-args', error: /Assign needs at least two arg/},
    {name: 'assign-first-arg', error: /The first argument to assign/},
    {name: 'undefined-binding', error: /Undefined binding/},
    {name: 'call-non-function', error: /Calling a non-function/},
    {name: 'assign-non-existent-var', error: /Tried to assign/},
    {name: 'multilevel-assign-error', error: /The object/},
    {name: 'hash-args', error: /To create a hash/},
    {name: 'object-args', error: /To create an object/},
  ];

  const runTest = (test) => {
    it(test.name, () => {
      should.throw(() => {
        runFromFile(basePath + test.name + '.pls');
      }, test.error);
    });
  };

  testList.forEach((test) => {
    runTest(test);
  });
});
