const { exec } = require("child_process");
const { getPath, DEFAULT_PATH } = require("./pathHelpers");


const openFile = (file, type) => {
  const path = getPath(file, type)
  console.log("path", path)
  exec(`open -a Preview ${path}`)
}

const openSeedingFolder = () => {
  exec(`open ${DEFAULT_PATH}`)
}

module.exports = {
  openFile: openFile,
  openSeedingFolder: openSeedingFolder
}