// @ts-check
/**
 * @description A file that tests the language extensions for the REPL
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 22/04/2021
 */

'use strict';

require('chai').should();
const {evaluate, parse} = require('../src/main.js');
const {topScopeREPL} = require('../src/lib/interpreter/plugins/repl.js');
const sinon = require('sinon');

describe('REPL', () => {
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

  it('help', () => {
    evaluate(parse('help()'), topScopeREPL);
    result.should.eql([
      'help()'.blue + ' shows this message'.green,
      'exit() or CTRL-D'.blue + ' exits the REPL'.green,
    ]);
  });

  it('exit', () => {
    evaluate(parse('exit()'), topScopeREPL);
    result.should.eql([
      '\nPlease come back soon!'.blue,
    ]);
  });
});
