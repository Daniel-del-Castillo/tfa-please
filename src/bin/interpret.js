#!/usr/bin/env node
// @ts-check
/**
 * @description A executable to be able to interpret compiled Please lang files
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 15/04/2021
 */

'use strict';

const {program} = require('commander');
const {version} = require('../../package.json');
const {interpretFromFile} = require('../main.js');

program
    .version(version)
    .arguments('<fileName>')
    .option(
        '-p, --plugin <plugins...>', 'Paths for the plugin files',
    )
    .description(
        'Interpret a Please lang file',
        {fileName: 'The path of the file to interpret'},
    )
    .action((fileName, options) => {
      try {
        if (options.plugin != undefined) {
          options.plugin.forEach((plugin) => {
            require(process.cwd() + plugin);
          });
        }
        interpretFromFile(fileName);
      } catch (err) {
        console.log('There was an error: ' + err.message);
      }
    });

program.parse(process.argv);
