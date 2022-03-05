
const fs = require('fs');
const path = require("path")
const IPFS = require('ipfs-core')
const {globSource} = require('ipfs')
var savePixels = require("save-pixels");
const all = require('it-all')
// const {fileTypeFromFile} = require('file-type')


const {DEFAULT_PATH, DRAFTS_PATH, getPath, getFileType} = require('./pathHelpers')


const { fromString } = require('uint8arrays/from-string')
const { toString: uint8ArrayToString } = require('uint8arrays/to-string')
const { concat: uint8ArrayConcat } = require('uint8arrays/concat');

const address1 =       {
  Swarm: ["/ip4/0.0.0.0/tcp/4014", "/ip4/127.0.0.1/tcp/4015/ws"],
  API: "/ip4/127.0.0.1/tcp/5012",
  Gateway: "/ip4/127.0.0.1/tcp/9192",
  RPC: "/ip4/127.0.0.1/tcp/4840",
}

const address2 =       {
  Swarm: ["/ip4/0.0.0.0/tcp/4012", "/ip4/127.0.0.1/tcp/4013/ws"],
  API: "/ip4/127.0.0.1/tcp/5011",
  Gateway: "/ip4/127.0.0.1/tcp/9191",
  RPC: "/ip4/127.0.0.1/tcp/4839",
}

var _ipfs
const getIPFS = async () => {

  if (_ipfs) return _ipfs
  _ipfs = await IPFS.create({
    repo: 'ok' + Math.random(),
    config: {
      Addresses: address2
    },
  });

  return _ipfs
}


const get = async (frequency) =>  {
  const content = []
  const ipfs = await getIPFS();

  var filename;

  const data = await uint8ArrayConcat(await all(ipfs.cat(frequency)))

  // getFileType(data)

  // console.log('data', data)
  
  // (async () => {
  //   const { fileTypeFromBuffer } = await import('file-type');
  
  //   const type = await fileTypeFromBuffer(data);
  //   console.log(type);
  // })();

  // console.log('[THEDATATATTATA]', data)
  fs.createWriteStream(getPath(frequency)).write(data);

  // fs.createWriteStream(getPath('huh.txt')).write('huh');
  // console.log("wtf")

  // for await (const file of ipfs.ls(frequency)) {
  //   console.log('FILE: ', file)
  //   filename = file.path
  //   const type = filename.split('.')[1]
  //   var saveFile = `${DRAFTS_PATH}/${filename}`
  //   console.log('[Saving To Drafts Path] -> ', saveFile)

  //   // for await (const buf of ipfs.get(file.path)) {
  //   //   // do something with buf
  //   //   console.log("BUF", buf.toString('utf8'))
  //   // }
  //   // for await (const chunk of ipfs.cat(file.path)) {
  //   //     // content.push(chunk.toString('utf8'))
  //   //     console.log("chunk", chunk.toString('utf8'))
  //   //     // fs.writeFile(filename, chunk.toString('utf8'))
  //   //     // savePixels(chunk, type).pipe('test.txt')
  //   // }

  //   // const data = await uint8ArrayConcat(await all(ipfs.cat(frequency)))
  //   // console.log('datatata', data)

  //   // fs.createWriteStream('boob.txt').write('huh');
  // }

  return frequency
}

//options specific to globSource
const globSourceOptions = {
  recursive: true
};

const addOptions = {
  pin: true,
  wrapWithDirectory: true,
  timeout: 10000
};


const addAll = async (path) => {
  const ipfs = await getIPFS();
  // const { cid } = await ipfs.add({
    //   path: 'polka.png'
    // })
    // return cid

  for await (const file of ipfs.addAll(globSource(path, '**/*', {
    hidden: false
  }), addOptions)) {
    console.log(file)
  
  }
  
}

module.exports = {
  get,
  addAll
}