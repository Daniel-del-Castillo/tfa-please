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

  it('Tried to call non function', () => {
    should.throw(() => {
      interpretFromFile(basePath + 'call-non-function.cpls');
    }, /Calling a non-function/);
  });

  it('Undefined binding', () => {
    should.throw(() => {
      interpretFromFile(basePath + 'undefined-binding.cpls');
    }, /Undefined binding/);
  });

  it('Assign to non existent var', () => {
    should.throw(() => {
      interpretFromFile(basePath + 'assign-non-existent.cpls');
    }, /Tried to assign to a non existent var/);
  });

  it('First argument to assign must be a variable name', () => {
    should.throw(() => {
      interpretFromFile(basePath + 'assign-first-arg.cpls');
    }, /The first argument to assign/);
  });

  it('Assign needs two arguments', () => {
    should.throw(() => {
      interpretFromFile(basePath + 'assign-two-args.cpls');
    }, /Assign needs two arg/);
  });
  it('Functions won\'t accept a different number of args', () => {
    should.throw(() => {
      interpretFromFile(basePath + 'fn-wrong-arg-numbers.cpls');
    }, /Wrong number of arg/);
  });
});
