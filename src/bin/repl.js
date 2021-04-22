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
const {parse, evaluate, Lexer, keywords} = require('../main.js');
require('colors');
const {topScopeREPL} = require('../lib/interpreter/plugins/repl.js');
const {WHITE} = require('../lib/compiler');
const ALL_WHITE = new RegExp(WHITE.source + '$');
const PROMPT = '>';


let program = '';
let stack = 0;
const completer = (line) => {
  if (ALL_WHITE.test(line)) {
    return [];
  }
  const lexer = new Lexer(line);
  const tokens = [];
  lexer.advanceToken();
  while (lexer.getLookAhead().type !== 'EOF') {
    try {
      tokens.push(lexer.getLookAhead());
      lexer.advanceToken();
    } catch (err) {
      break;
    }
  }
  const word = tokens.filter((token) => token.type === 'WORD').pop().name;
  const allWords = Object.keys(topScopeREPL).concat(Object.keys(keywords));
  const hits = allWords.filter((w) => w.startsWith(word));
  return [hits, word];
};

const rl = readline.createInterface(
    {input: process.stdin, output: process.stdout, completer},
);

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
      const r = evaluate(parse(program), Object.create(topScopeREPL));
      console.log(r ? r.toString().blue : 'No value returned'.blue);
    } catch (err) {
      console.log(err.toString().red);
    }
    program = '';
    stack = 0;
  }
  rl.setPrompt((PROMPT + '..'.repeat(stack)).green);
  rl.prompt();
});

rl.on('close', topScopeREPL.exit);

rl.on('SIGINT', () => {
  console.log('\nExpression discarded'.red);
  program = '';
  stack = 0;
  // @ts-ignore
  rl.clearLine(process.stdout);
  rl.setPrompt((PROMPT).green);
  rl.prompt();
});

console.log('Please ' + version);
rl.setPrompt(PROMPT.green);
rl.prompt();
