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

  it('while', () => {
    interpretFromFile(basePath + 'while.cpls').should.eql(false);
  });

  it('if', () => {
    interpretFromFile(basePath + 'if.cpls').should.eql(5);
  });

  it('if else', () => {
    interpretFromFile(basePath + 'if-else.cpls').should.eql(10);
  });

  it('false if', () => {
    interpretFromFile(basePath + 'false-if.cpls').should.eql(false);
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

  it('Parameter names must be words', () => {
    should.throw(() => {
      interpretFromFile(basePath + 'parameter-names.cpls');
    }, /Parameter names/);
  });

  it('Functions need bodies', () => {
    should.throw(() => {
      interpretFromFile(basePath + 'fn-needs-body.cpls');
    }, /Functions need a body/);
  });

  it('The first argument to let must be a valid variable name', () => {
    should.throw(() => {
      interpretFromFile(basePath + 'first-let-arg.cpls');
    }, /The first argument to let/);
  });

  it('let needs two arguments', () => {
    should.throw(() => {
      interpretFromFile(basePath + 'let-two-args.cpls');
    }, /let needs two arguments/);
  });

  it('Wrong number of args for while', () => {
    should.throw(() => {
      interpretFromFile(basePath + 'while-args-number.cpls');
    }, /Wrong number of arg/);
  });

  it('Wrong number of args for if', () => {
    should.throw(() => {
      interpretFromFile(basePath + 'if-args-number.cpls');
    }, /Wrong number of arg/);
  });
});
