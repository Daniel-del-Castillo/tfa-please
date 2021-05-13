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

describe('Transpiler', () => {
  const runTest = (testName) => {
    const expected = fs.readFileSync(
        'test/js/' + testName + '.js', {encoding: 'utf8'},
    );
    convertToJSFromFile('test/pls/' + testName + '.pls')
        .should.eql(expected);
  };

  const testList = [
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
  const runTest = (testName) => {
    const expected = fs.readFileSync(
        'test/js/' + testName + '.js', {encoding: 'utf8'},
    );
    convertToJSFromFile('test/pls/' + testName + '.pls')
        .should.eql(expected);
  };

  const testList = [
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