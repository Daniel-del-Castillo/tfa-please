// @ts-check
/**
 * @description A file with the tests for Please lang JS transpiler
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 11/05/2021
 */

'use strict';

require('chai').should();
const {convertToJSFromFile, runFromFile} = require('../src/main.js');
const fs = require('fs');
const sinon = require('sinon');

const testList = [
  'if',
  'if-else',
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
  'do-with-let-at-end',
  'chained-def',
  'expressive-assignments',
  'if-at-end',
  'method-undefined',
  'constant-folding',
];

describe('Transpiler', () => {
  const runTest = (testName) => {
    const expected = fs.readFileSync(
        'test/js/' + testName + '.jstest', {encoding: 'utf8'},
    ).replace(/\r/g, '');
    convertToJSFromFile('test/pls/' + testName + '.pls').replace(/\r/g, '')
        .should.eql(expected);
  };

  testList.forEach((test) => {
    it(test, () => {
      runTest(test);
    });
  });
});

describe('Correct functioning of transpiled code', () => {
  let result = [];
  let logStub;

  beforeEach(() => {
    logStub = sinon.stub(console, 'log');
    logStub.callsFake((...args) => args.forEach((arg) => result.push(arg)));
  });

  afterEach(() => {
    result = [];
    logStub.restore();
  });

  const runTest = (testName) => {
    runFromFile('test/pls/' + testName + '.pls');
    const expected = result;
    result = [];
    const code = fs.readFileSync('test/cjs/' + testName + '.js', 'utf-8');
    eval(code);
    result.should.eql(expected);
  };

  testList.forEach((testName) => {
    it(testName, () => {
      runTest(testName);
    });
  });
});
