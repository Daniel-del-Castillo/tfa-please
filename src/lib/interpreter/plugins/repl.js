// @ts-check
/**
 * @description The file contains some extensions of the Please language
 *     made for the REPL loop
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 22/04/2021
 * @module PleaseLangREPLExtension
 */

'use strict';

const {topScope} = require('./top-scope.js');
const topScopeREPL = Object.create(topScope);
require('colors');

topScopeREPL.exit = () => {
  console.log('\nPlease come back soon!'.blue);
};

topScopeREPL.help = () => {
  console.log('help()'.blue + ' shows this message'.green);
  console.log('exit() or CTRL-D'.blue + ' exits the REPL'.green);
};

module.exports = {topScopeREPL};
