const fs = require('fs')
const moveFile = require('@npmcli/move-file');
const {fromBuffer} = require('file-type')
// const {readChunk} = require('read-chunk')

// var Magic = require('mmmagic').Magic;
const { isText, isBinary, getEncoding } = require('istextorbinary')

// const magic = new Magic();


const HOME_DIR = require('os').homedir();
const DEFAULT_PATH = `${HOME_DIR}/Desktop/polka-seeding`
const DRAFTS_PATH = `${DEFAULT_PATH}/.drafts`


const deleteDraftsFile = (filename) => {
  const path = `${DRAFTS_PATH}/${filename}`
  console.log("Deleting File @ Path -> ", path)
  try {
    fs.unlinkSync(path)
  } catch (err) {
    console.log("err", err)
  }
}

const seedDraftsFile = async(filename) => {
  const path = `${DRAFTS_PATH}/${filename}`
  const toPath = `${DEFAULT_PATH}/${filename}`
  console.log("Saving and seeding file for others")
  try {
    await moveFile(path, toPath)
  } catch (err) {
    console.log("err", err)
  }
}



const getFileType = async (filename) => {
  // const path = `${DRAFTS_PATH}/${filename}`

  const fileType = fromBuffer(filename)
  console.log("ENCODING", fileType)
  return fileType
}

const printFile = (filename) => {
  const path = `${DRAFTS_PATH}/${filename}`
  const data = fs.readFileSync(path)
  console.log(data.toString())
}

const getPath = (filename) => {
  return `${DRAFTS_PATH}/${filename}`
}


module.exports = {
  DEFAULT_PATH: DEFAULT_PATH,
  DRAFTS_PATH: DRAFTS_PATH,
  deleteDraftsFile: deleteDraftsFile,
  getFileType: getFileType,
  printFile: printFile,
  getPath: getPath,
  seedDraftsFile: seedDraftsFile,
}