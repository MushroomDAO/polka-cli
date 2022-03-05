const inquirer = require('inquirer');
const ipfs = require('../src/util/ipfs');


const { deleteDraftsFile, getFileType, printFile, seedDraftsFile } = require('../src/util/pathHelpers');
const { openFile } = require('../src/util/shellHelpers');

exports.command = "read [frequency]";
exports.describe = "Read the content at that frequency.";
exports.builder = {
};

exports.handler = async function(argv) {
  const {frequency} = argv
  
  console.log(`[Reading] ${frequency} Frequency`)

  const file = await ipfs.get(frequency)

  // process.exit(0)
  // console.log('Data', file)
  // const isBinary = await getFileType(file)
  // console.log("is binary", isBinary)


  // openFile(file)
  // if (isBinary) {
  // } else {
  //   printFile(file)
  // }

  const {save} = await inquirer
  .prompt([
    {
      type: 'list',
      name: 'save',
      message: 'Would you like to save this and also help share it with more people?',
      choices: ['Yes', 'No', 'Maybe'],
    },
  ])
  
  if (save === 'No') {
    deleteDraftsFile(file)
  }

  if (save === 'Maybe') {
    console.log('We have decided for you')
  }

  // console.log('Saving and seeding file for others')
  await seedDraftsFile(frequency)
  process.exit(0);
};

