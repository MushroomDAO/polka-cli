const yargs = require("yargs");
const clear = require('clear');
// const chalk = require('chalk');
// import chalk from 'chalk'
const figlet = require('figlet');

// console.log(
//   chalk.red(
//     figlet.textSync('pizza-cli', { horizontalLayout: 'full' })
//   )
// );

clear()
console.log(
  // chalk.red(
    figlet.textSync('polka-cli', { horizontalLayout: 'full' })
  // )
);
console.log("p2p social network, in your terminal")

console.log('')
console.log('')
console.log('')

yargs
  .command(require("./commands/read"))
  .command(require("./commands/seed"))
  .demandCommand()
  .wrap(Math.min(100, yargs.terminalWidth()))
  .help().argv;