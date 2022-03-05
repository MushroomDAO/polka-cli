const fs = require('fs')
const moveFile = require('@npmcli/move-file');
var mmm = require('mmmagic'),
Magic = mmm.Magic;
var mime = require('mime-types')
var magic = new Magic(mmm.MAGIC_MIME_TYPE);

const HOME_DIR = require('os').homedir();
const DEFAULT_PATH = `${HOME_DIR}/Desktop/polka-seeding`
const DRAFTS_PATH = `${DEFAULT_PATH}/.drafts`

const deleteDraftsFile = (filename, type) => {
  const path = getPath(filename, type)
  console.log("Deleting File @ Path -> ", path)
  try {
    fs.unlinkSync(path)
  } catch (err) {
    console.log("err", err)
  }
}

const seedDraftsFile = async(filename, type) => {
  const path = getPath(filename, type)
  const toPath = `${DEFAULT_PATH}/${filename}.${type}`
  console.log("Saving and seeding file for others")
  try {
    await moveFile(path, toPath)
  } catch (err) {
    console.log("err", err)
  }
}

const getFileType = async (filename, type, cb) => {
  const path = getPath(filename, type)

  magic.detectFile(path, (err, mimeType) => {
    console.log('TYPE', mimeType)
    if (err) return null
    const ext = mime.extension(mimeType)
    console.log("EXTENSION??", ext)
    cb (ext)
  });
}

const getFileTypeFromBuffer = async (buf, cb) => {
  magic.detect(buf, (err, mimeType) => {
    if (err) return null    
    const ext = mime.extension(mimeType) 
    cb(ext)
  })
}

const printFile = (filename, type) => {
  const path = getPath(filename, type)
  const data = fs.readFileSync(path)
  console.log('File contents: ')
  console.log('')
  console.log(data.toString())
  console.log('')
}

const getPath = (filename, type) => {
  return `${DRAFTS_PATH}/${filename}.${type}`
}


module.exports = {
  DEFAULT_PATH: DEFAULT_PATH,
  DRAFTS_PATH: DRAFTS_PATH,
  deleteDraftsFile: deleteDraftsFile,
  getFileType: getFileType,
  printFile: printFile,
  getPath: getPath,
  seedDraftsFile: seedDraftsFile,
  getFileTypeFromBuffer: getFileTypeFromBuffer
}