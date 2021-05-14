// @ts-check
/**
 * @description A file with the tests for Please lang JS transpiler
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 11/05/2021
 */

'use strict';

require('chai').should();
const {convertToJSFromFile} = require('../src/main.js');
const fs = require('fs');
const sinon = require('sinon');

describe('Transpiler', () => {
  const runTest = (testName) => {
    const expected = fs.readFileSync(
        'test/js/' + testName + '.js', {encoding: 'utf8'},
    );
    convertToJSFromFile('test/pls/' + testName + '.pls')
        .should.eql(expected);
  };

  const testList = [
    'println',
    'array',
    'array-sum',
    'method-example',
    'array-properties',
    'js-methods',
    'map',
    'sub',
    '=',
    'currying',
    'undefined-sub',
    'operation-methods',
    'negative-indexes',
    'multilevel-assign',
    'hash',
    'hash-colon',
    'sub-in-hash',
    'object',
    'dot-operator',
    'regexp',
    'regexp2',
    'for',
    'foreach',
    'times',
    'hello-scope',
    'funfun',
  ];

  testList.forEach((test) => {
    it(test, () => {
      runTest(test);
    });
  });
});

describe('Correct functioning of transpiled code', () => {
  const result = [];
  let logStub;

  beforeEach(() => {
    logStub = sinon.stub(console, 'log');
    logStub.callsFake((...args) => args.forEach((arg) => result.push(arg)));
  });

  afterEach(() => {
    result.splice(0, result.length);
    logStub.restore();
  });

  const runTest = (test) => {
    const code = fs.readFileSync('test/cjs/' + test.name + '.js', 'utf-8');
    eval(code);
    result.should.eql(test.result);
  };

  const testList = [
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
    {name: 'for', result: [0, 1, 2, 3, 4, 7]},
    {name: 'foreach', result: [1, 2, 3]},
    {name: 'times', result: [23, 6]},
    {name: 'hello-scope', result: ['computed value = ', 5]},
    {name: 'funfun', result: [6]},
  ];

  testList.forEach((test) => {
    it(test.name, () => {
      runTest(test);
    });
  });
});
