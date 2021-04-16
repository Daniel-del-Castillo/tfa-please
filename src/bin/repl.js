#!/usr/bin/env node
// @ts-check
/**
 * @description The Please lang repl
 * @author Daniel del Castillo de la Rosa <alu0101225548@ull.edu.es>
 * @since 16/04/2021
 */

'use strict';

const {version} = require('../../package.json');
const readline = require('readline');
const {parse, evaluate, createTopScope, Lexer, keywords} =
    require('../main.js');
require('colors');
const ALL_WHITE = /^(?:\s|\/\/.*|\/\*(?:.|\n)*?\*\/)*$/;
const PROMPT = '>';

const topScope = createTopScope();

let program = '';
let stack = 0;
const completer = (line) => {
  const lexer = new Lexer(line);
  const tokens = [];
  while (true) {
    try {
      tokens.push(lexer.nextToken());
      lexer.consumeToken();
    } catch (err) {
      break;
    }
  }
  const word = tokens.filter((token) => token.type === 'WORD').pop().name;
  const allWords = Object.keys(topScope).concat(Object.keys(keywords));
  const hits = allWords.filter((w) => w.startsWith(word));
  return [hits, word];
};

const rl = readline.createInterface(
    {input: process.stdin, output: process.stdout, completer},
);

topScope.exit = () => {
  console.log('\nPlease come back soon!'.blue);
};

topScope.help = () => {
  console.log('help()'.blue + ' shows this message'.green);
  console.log('exit() or CTRL-D'.blue + ' exits the REPL'.green);
};

rl.on('line', (line) => {
  line += '\n';
  program += line;
  stack += (line.split('(').length - 1) - (line.split(')').length - 1);
  if (stack < 0) {
    console.log('There were unmatched parenthesis'.red);
    program = '';
    stack = 0;
  } else if (stack === 0 && !ALL_WHITE.test(program)) {
    try {
      const r = evaluate(parse(program), topScope);
      console.log(r ? r.toString().red : 0);
    } catch (err) {
      console.log(err.toString().red);
    }
    program = '';
    stack = 0;
  }
  rl.setPrompt((PROMPT + '..'.repeat(stack)).green);
  rl.prompt();
});

rl.on('close', topScope.exit);

rl.on('SIGINT', () => {
  program = '';
  stack = 0;
  rl.setPrompt((PROMPT).green);
  console.log('\nExpression discarded'.red);
  rl.prompt();
});

console.log('Please ' + version);
rl.setPrompt(PROMPT.green);
rl.prompt();
