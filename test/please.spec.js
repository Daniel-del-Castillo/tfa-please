// @ts-check
/**
 * @description A file with general tests for Please lang
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 15/04/2021
 */

'use strict';

require('chai').should();
const {runFromFile} = require('../src/main.js');

describe('Miscellanous', () => {
  it('Run from file', () => {
    runFromFile('test/pls/fixing-scope.pls').should.eql(50);
  });
});
