#!/usr/bin/env node
// @ts-check
/**
 * @description A executable to be able to compile Please lang files
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 15/04/2021
 */

'use strict';

const {program} = require('commander');
const {version} = require('../../package.json');
const {compile} = require('../main.js');

program
    .version(version)
    .arguments('<origin>')
    .option(
        '-o, --out <destination>', 'Path for output file. If it isn\'t ' +
        'specified the path of the origin file will be used,' +
        'changing the extension to .cpls',
    )
    .description(
        'Compile a Please lang file',
        {
          origin: 'The path of the file to compile',
        },
    )
    .action((origin, options) => {
      try {
        compile(origin, options.out);
      } catch (err) {
        console.log('There was an error: ' + err.message);
      }
    });

program.parse(process.argv);
