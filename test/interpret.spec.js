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
    {name: 'while', result: false},
    {name: 'if', result: 5},
    {name: 'if-else', result: 10},
    {name: 'false-if', result: false},
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
    {name: 'println', result: ['Hello world']},
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

  it('Tried to assign to non existent variable', () => {
    should.throw(() => {
      runFromFile(basePath + 'assign-non-existent-var.pls');
    }, /Tried to assign/);
  });

  it('Tried to call non function', () => {
    should.throw(() => {
      runFromFile(basePath + 'call-non-function.pls');
    }, /Calling a non-function/);
  });

  it('Undefined binding', () => {
    should.throw(() => {
      runFromFile(basePath + 'undefined-binding.pls');
    }, /Undefined binding/);
  });

  it('First argument to assign must be a variable name', () => {
    should.throw(() => {
      runFromFile(basePath + 'assign-first-arg.pls');
    }, /The first argument to assign/);
  });

  it('Assign needs two arguments', () => {
    should.throw(() => {
      runFromFile(basePath + 'assign-two-args.pls');
    }, /Assign needs two arg/);
  });

  it('Functions won\'t accept a different number of args', () => {
    should.throw(() => {
      runFromFile(basePath + 'fn-wrong-arg-numbers.pls');
    }, /Wrong number of arg/);
  });

  it('Parameter names must be words', () => {
    should.throw(() => {
      runFromFile(basePath + 'parameter-names.pls');
    }, /Parameter names/);
  });

  it('Functions need bodies', () => {
    should.throw(() => {
      runFromFile(basePath + 'fn-needs-body.pls');
    }, /Functions need a body/);
  });

  it('The first argument to let must be a valid variable name', () => {
    should.throw(() => {
      runFromFile(basePath + 'first-let-arg.pls');
    }, /The first argument to let/);
  });

  it('let needs two arguments', () => {
    should.throw(() => {
      runFromFile(basePath + 'let-two-args.pls');
    }, /let needs two arguments/);
  });

  it('Wrong number of args for while', () => {
    should.throw(() => {
      runFromFile(basePath + 'while-args-number.pls');
    }, /Wrong number of arg/);
  });

  it('Wrong number of args for if', () => {
    should.throw(() => {
      runFromFile(basePath + 'if-args-number.pls');
    }, /Wrong number of arg/);
  });
});
