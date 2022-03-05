#!/usr/bin/env node

const yargs = require("yargs");
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');
const path = require("path")
const {DEFAULT_PATH, DRAFTS_PATH} = require('./src/util/pathHelpers');

const folderExists = () => {
  if (fs.existsSync(DEFAULT_PATH)) {
    return true
  } else {
    return false
  }
}

clear()
console.log(
  chalk.yellow(
    figlet.textSync('polka-cli', { horizontalLayout: 'full' })
  )
);
console.log("simple p2p social network, in your terminal")

console.log('')
console.log('')

const hasDefaultFolder = folderExists()

if (!hasDefaultFolder) {
  console.log('Creating Polka folder on your desktop')
  console.log("Anything you add to this folder will then be sharable with the p2p network")
  console.log("People you share it with can then host it and share it with others, making it uncensorable")

  fs.mkdirSync(DEFAULT_PATH);
  fs.mkdirSync(DRAFTS_PATH);
}

yargs
  .command(require("./commands/read"))
  .command(require("./commands/seed"))
  .demandCommand()
  .wrap(Math.min(100, yargs.terminalWidth()))
  .help().argv;