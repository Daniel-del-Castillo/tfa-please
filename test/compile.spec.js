// @ts-check
/**
 * @description A file with the tests for Please lang compiler
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 15/04/2021
 */

'use strict';

const should = require('chai').should();
const {parseFromFile} = require('../src/main.js');
const fs = require('fs');

describe('Compiler', () => {
  const runTest = (testName) => {
    const expected = JSON.parse(
        fs.readFileSync('test/cpls/' + testName + '.cpls', {encoding: 'utf8'}));
    parseFromFile('test/pls/' + testName + '.pls').should.eql(expected);
  };

  const testList = [
    'fixing-scope',
    'println',
    'while',
    'if',
    'if-else',
    'false-if',
    'array',
    'array-sum',
    'method-example',
    'method-undefined',
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
  ];

  testList.forEach((test) => {
    it(test, () => {
      runTest(test);
    });
  });
});

describe('Compiler errors', () => {
  const basePath = 'test/pls/compiler-errors/';

  const testList = [
    {name: 'unexpected-token-call', error: /Unexpected token/},
    {name: 'unexpected-token-expr', error: /Unexpected token/},
    {name: 'unexpected-eof', error: /EOF/},
    {name: 'invalid-token', error: /Invalid token/},
    {name: 'expected,or)', error: /Expected ',' or '\)'/},
    {name: 'unexpected-text', error: /Unexpected text/},
  ];

  const runTest = (test) => {
    it(test.name, () => {
      should.throw(() => {
        parseFromFile(basePath + test.name + '.pls');
      }, test.error);
    });
  };

  testList.forEach((test) => {
    runTest(test);
  });
});
