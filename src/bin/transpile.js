#!/usr/bin/env node
/**
 * @description A executable to be able to transpile Please lang files
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 12/05/2021
 */

'use strict';

const {program} = require('commander');
const {version} = require('../../package.json');
const {transpile, transpileFromCompiled} = require('../main.js');
const ncc = require('@vercel/ncc');
const path = require('path');
const fs = require('fs');

const removeMonkeyPatching = () => {
  Object.keys(Object.prototype).forEach((key) => {
    delete Object.prototype[key];
  });
};

program
    .version(version)
    .arguments('<fileName>')
    .option(
        '-o, --out <destination>', 'Path for output file. If it isn\'t ' +
        'specified the path of the origin file will be used,' +
        'changing the extension to .js',
    )
    .option(
        '-c, --compiled', 'Transpile an already compiled Please lang file',
    )
    .option(
        '-l, --legible', 'Transpile to a legible but not independent file. ' +
        'This is provided so it is possible to inspect the output',
    )
    .description(
        'Interpret a Please lang file',
        {fileName: 'The path of the file to interpret'},
    )
    .action((fileName, options) => {
      const oldConsoleLog = console.log;
      console.log = () => {};
      const outputFile = path.join(
          process.cwd(),
          (options.out || fileName.match(/^[^\.]*/)[0] + '.js'),
      );
      try {
        if (options.legible) {
          if (options.compiled) {
            transpileFromCompiled(fileName, outputFile);
          } else {
            transpile(fileName, outputFile);
          }
          return;
        }
        const intermediateFile = path.join(__dirname, 'temp');
        if (options.compiled) {
          transpileFromCompiled(fileName, intermediateFile);
        } else {
          transpile(fileName, intermediateFile);
        }
        removeMonkeyPatching();
        ncc(intermediateFile, {minify: true}).then(({code, map, assets}) => {
          fs.writeFileSync(outputFile, code);
          fs.unlinkSync(intermediateFile);
        });
      } catch (err) {
        console.log = oldConsoleLog;
        console.log('There was an error: ' + err.message);
      }
    });

program.parse(process.argv);
