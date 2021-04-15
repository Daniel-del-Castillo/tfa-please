// @ts-check
/**
 * @description A file with the tests for Please lang interpreter
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 15/04/2021
 */

'use strict';

require('chai').should();
const {interpretFromFile} = require('../src/main.js');

describe('Interpreter', () => {
  it('Fixing scope', () => {
    interpretFromFile('test/cpls/fixing-scope.cpls').should.eql(50);
  });
});
