#! /usr/bin/env node

// help command
var program = require('commander');
var install = require('../lib/install');
var run = require('../lib/run');
var pkg = require('../package.json');

program
    .description(pkg.description)
    .version(pkg.version)
    .usage('[options] <file ...>')
    .option('-b, --build-command <npm command>', 'NPM command to hook leasot-to-readme to (default: start)', 'start')
    .option('-o, --output-file', 'output file to list TODOs and FIXMEs (default: README.md)', 'README.md')
    .option('-t, --title-file', 'Path to Markdown file of title (default: \'\')', '')
    .on('--help', function () {
        console.log('  Examples:');
        console.log('');
        console.log('    # Install with default settings (\'start\' build command, README.md output, no title Markdown)');
        console.log('    $ leasot-to-readme install');
        console.log('');
        console.log('    # Run one time with default settings (without installing)');
        console.log('    $ leasot-to-readme run');
        console.log('');
        console.log('    # Install with ALL the settings! (hook after npm run dev command, print to README_PROD.md, take title Markdown from awesome-leasot-to-readme-header.md)');
        console.log('    $ leasot-to-readme --build-command dev --output-file README_PROD.md --title-file awesome-leasot-to-readme-header.md');
        console.log('');
    })
    .on('install', function() {
      install(program);
    })
    .on('run', function() {
      run(program);
    })
    .parse(process.argv);
