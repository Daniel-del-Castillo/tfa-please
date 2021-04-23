[![Test](https://github.com/ULL-ESIT-PL-2021/please-Daniel-del-Castillo/actions/workflows/test.yaml/badge.svg?branch=main)](https://github.com/ULL-ESIT-PL-2021/please-Daniel-del-Castillo/actions/workflows/test.yaml)
# Please Lang
## Made by Daniel del Castillo de la Rosa
This respository contains a language called Please. This language has been designed to run on top of JavaScript, mimicking the [Egg language](https://eloquentjavascript.net/12_language.html).
## Installation
You can install the language like this:
```sh
npm i -g @ull-esit-pl-2021/please-Daniel-del-Castillo
```
You can also install locally.
## Use
### From the CLI
There is a main executable `please` that acts as compiler and interpreter. Please is an interpreted language, but it can be sort of compiled to a JSON AST. Below the help the please executable help:
```sh
Usage: please [options] [command]

A simple programming language built on top of JavaScript

Options:
  -V, --version           output the version number
  -h, --help              display help for command

Commands:
  repl                    Run the Please lang repl
  run|r <fileName>        Run a Please lang file
  compile|c <origin>      compile a Please lang file
  interpret|i <fileName>  interpret a compiled Please lang file
  help [command]          display help for command
```
The subcommands can also be used as executables and are also exported. Each subcommand also has its own help.
### From code
The module exports the following functions:
```js
module.exports = {
  interpret,
  interpretFromFile,
  run,
  runFromFile,
  topScope,
  topScopeREPL,
  keywords,
  evaluate,
  parse,
  parseCall,
  parseExpression,
  parseFromFile,
  compile,
  Lexer,
};

```
You can check what each of them does in the documentation.
## Documentation
The code is extensively documented. The generated documentation can be consulted [here](https://ull-esit-pl-2021.github.io/egg-method-evaluate-Daniel-del-Castillo/index.html)

## Features
The Please language has severals features:
* While loops
* If else constructs
* Functions (closure-like)
* Arrays

There are examples inside the test folder for each of this ones

## Contribution
You can contribute to the code if you want! Just keep in mind this isn't a serious project and that your code will be under release to the public domain, because this project uses [Unlicense](https://unlicense.org/)
