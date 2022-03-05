const yargs = require("yargs");
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');

clear()
console.log(
  chalk.yellow(
    figlet.textSync('polka-cli', { horizontalLayout: 'full' })
  )
);
console.log("simple p2p social network, in your terminal")

console.log('')
console.log('')

yargs
  .command(require("./commands/read"))
  .command(require("./commands/seed"))
  .demandCommand()
  .wrap(Math.min(100, yargs.terminalWidth()))
  .help().argv;