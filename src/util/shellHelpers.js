const { exec } = require("child_process");
const { getPath } = require("./pathHelpers");


const openFile = (file) => {
  const path = getPath(file)
  console.log("path", path)
  exec(`open -a Preview ${path}`)
}

module.exports = {
  openFile: openFile
}