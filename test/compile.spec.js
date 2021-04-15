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

  it('Fixing scope', () => {
    runTest('fixing-scope');
  });

  it('Unexpected token in call', () => {
    should.throw(() => {
      parseFromFile('test/pls/unexpected-token-call.pls');
    }, /Unexpected token/);
  });

  it('Unexpected token in expr', () => {
    should.throw(() => {
      parseFromFile('test/pls/unexpected-token-expr.pls');
    }, /Unexpected token/);
  });

  it('Unexpected EOF', () => {
    should.throw(() => {
      parseFromFile('test/pls/unexpected-eof.pls');
    }, /EOF/);
  });

  it('Invalid token', () => {
    should.throw(() => {
      parseFromFile('test/pls/invalid-token.pls');
    }, /Invalid token/);
  });

  it('Expected , or )', () => {
    should.throw(() => {
      parseFromFile('test/pls/expected,or).pls');
    }, /Expected ',' or '\)'/);
  });

  it('Unexpected text after program', () => {
    should.throw(() => {
      parseFromFile('test/pls/unexpected-text.pls');
    }, /Unexpected text/);
  });
});
