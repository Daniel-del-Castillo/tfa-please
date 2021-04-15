#!/usr/bin/env node
// @ts-check
/**
 * @description A executable to be able to compile, execute or interpret Please
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 15/04/2021
 */

'use strict';

const {program} = require('commander');
const {version, description} = require('../../package.json');

program
    .version(version)
    .name('please')
    .description(description)
    .command(
        'run <fileName>',
        'Run a Please lang file',
        {executableFile: 'run.js', isDefault: true},
    )
    .command(
        'compile <origin>',
        'compile a Please lang file',
        {executableFile: 'compile.js'},
    ).alias('c')
    .command(
        'interpret <fileName>',
        'interpret a compiled Please lang file',
        {executableFile: 'interpret.js'},
    ).alias('i');

program.parse(process.argv);
