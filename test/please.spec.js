// @ts-check
/**
 * @description A file with general tests for Please lang
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 15/04/2021
 */

'use strict';

const should = require('chai').should();
const {
  interpretFromFile,
  compile,
  convertToJSFromFile,
  convertToJSFromCompiledFile,
  transpileFromCompiled,
  transpile,
} = require('../src/main.js');
const fs = require('fs');
const sinon = require('sinon');

describe('Miscellanous', () => {
  it('interpret from file', () => {
    interpretFromFile('test/cpls/fixing-scope.cpls').should.eql(50);
  });

  it('interpret from file with method call', () => {
    interpretFromFile('test/cpls/method-undefined.cpls').should.eql(true);
  });

  it('interpret from file with a regexp', () => {
    const logStub = sinon.stub(console, 'log');
    const result = [];
    logStub.callsFake((arg) => result.push(arg));
    interpretFromFile('test/cpls/regexp2.cpls');
    logStub.restore();
    result.should.eql([true, '1987-07-14', 0, '2015', '02']);
  });

  it('invalid node type', () => {
    should.throw(() => {
      interpretFromFile('test/cpls/invalid-node.cpls');
    }, /Invalid node/);
  });

  it('Compile', () => {
    compile('test/pls/fixing-scope.pls');
    const actual = JSON.parse(
        fs.readFileSync('test/pls/fixing-scope.cpls', {encoding: 'utf8'}),
    );
    const expected = JSON.parse(
        fs.readFileSync('test/cpls/fixing-scope.cpls', {encoding: 'utf8'}),
    );
    fs.unlinkSync('test/pls/fixing-scope.cpls');
    actual.should.eql(expected);
  });

  it('Convert to JS from compiled file', () => {
    const actual = convertToJSFromCompiledFile('test/cpls/funfun.cpls');
    const expected = convertToJSFromFile('test/pls/funfun.pls');
    actual.should.eql(expected);
  });

  it('Transpile from compiled file', () => {
    transpileFromCompiled('test/cpls/funfun.cpls');
    const actual = fs.readFileSync('test/cpls/funfun.js', {encoding: 'utf8'});
    const expected = fs.readFileSync('test/js/funfun.js', {encoding: 'utf8'});
    fs.unlinkSync('test/cpls/funfun.js');
    actual.should.eql(expected);
  });

  it('Transpile', () => {
    transpile('test/pls/funfun.pls');
    const actual = fs.readFileSync('test/pls/funfun.js', {encoding: 'utf8'});
    const expected = fs.readFileSync('test/js/funfun.js', {encoding: 'utf8'});
    fs.unlinkSync('test/pls/funfun.js');
    actual.should.eql(expected);
  });
});
