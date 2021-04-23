// @ts-check
/**
 * @description A file that tests the language extensions for the REPL
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 22/04/2021
 */

'use strict';

const should = require('chai').should();
const {evaluate, parse, topScope} = require('../src/main.js');
require('../src/lib/interpreter/plugins/repl.js');
const sinon = require('sinon');
require('../src/lib/interpreter/plugins/require.js');

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
    evaluate(parse('help()'), topScope);
    result.should.eql([
      'help()'.blue + ' shows this message'.green,
      'exit() or CTRL-D'.blue + ' exits the REPL'.green,
    ]);
  });

  it('exit', () => {
    evaluate(parse('exit()'), topScope);
    result.should.eql([
      '\nPlease come back soon!'.blue,
    ]);
  });
});

describe('require', () => {
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

  it('require', () => {
    const require = 'require("./test/pls/println.pls")';
    evaluate(parse('do(' + require + ', ' + require + ')'), topScope);
    result.should.eql(['Hello world']);
  });

  it('invalid require', () => {
    should.throw(() => evaluate(parse('require(2)'), topScope),
        /Invalid argument/);
  });
});
