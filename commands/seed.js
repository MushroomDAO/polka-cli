const fs = require('fs');
const path = require("path")
const chokidar = require('chokidar');
const ipfs = require('../src/util/ipfs')

const {DEFAULT_PATH, DRAFTS_PATH} = require('../src/util/pathHelpers');
const { openSeedingFolder } = require('../src/util/shellHelpers');

exports.command = "seed";
exports.describe = "Starts seeding the polka directory";

exports.builder = {
};

const folderExists = () => {
  if (fs.existsSync(DEFAULT_PATH)) {
    return true
  } else {
    return false
  }
}

const listenForChanges = () => {
  const watcher = chokidar.watch(DEFAULT_PATH, {ignored: /^\./, persistent: true});

  watcher
    .on('add', function(p) {console.log('File', path.basename(p), 'has been added');})
    .on('change', function(p) {console.log('File', path.basename(p), 'has been changed');})
    .on('unlink', function(p) {console.log('File', path.basename(p), 'has been removed');})
    .on('error', function(p) {console.error('Error happened', error);})
}


exports.handler = async function(argv) {
  const hasDefaultFolder = folderExists()

  if (!hasDefaultFolder) {
    console.log('Creating Polka folder on your desktop')
    console.log("Anything you add to this folder will then be sharable with the p2p network")
    console.log("People you share it with can then host it and share it with others, making it uncensorable")

    fs.mkdirSync(DEFAULT_PATH);
    fs.mkdirSync(DRAFTS_PATH);
  }

  // listenForChanges()
  openSeedingFolder()

  console.log('Share the hash on the left with anyone')
  console.log('If they run `polka read <hash>` they should download that file from the network')
  console.log('NOTE: Someone needs to be running `polka seed` with that file for it to be retrieveable')

  console.log('')
  await ipfs.addAll(DEFAULT_PATH)

  // process.exit(0);
};