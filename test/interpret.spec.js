// @ts-check
/**
 * @description A file with the tests for Please lang interpreter
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 15/04/2021
 */

'use strict';

const should = require('chai').should();
const {interpretFromFile} = require('../src/main.js');

describe('Interpreter', () => {
  const basePath = 'test/cpls/';
  it('Fixing scope', () => {
    interpretFromFile(basePath + 'fixing-scope.cpls').should.eql(50);
  });

  it('println', () => {
    interpretFromFile(basePath + 'println.cpls').should.eql('Hello world');
  });
});

describe('Interpreter errors', () => {
  const basePath = 'test/cpls/errors/';
  it('Tried to assign to non existent variable', () => {
    should.throw(() => {
      interpretFromFile(basePath + 'assign-non-existent-var.cpls');
    }, /Tried to assign/);
  });
});
