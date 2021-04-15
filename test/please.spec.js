// @ts-check
/**
 * @description A file with general tests for Please lang
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 15/04/2021
 */

'use strict';

require('chai').should();
const {runFromFile, compile} = require('../src/main.js');
const fs = require('fs');

describe('Miscellanous', () => {
  it('Run from file', () => {
    runFromFile('test/pls/fixing-scope.pls').should.eql(50);
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
});
