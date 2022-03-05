
const fs = require('fs');
const path = require("path")
const IPFS = require('ipfs-core')
const {globSource} = require('ipfs')
const all = require('it-all')
// const {fileTypeFromFile} = require('file-type')


const {DEFAULT_PATH, DRAFTS_PATH, getPath, getFileType, getFileTypeFromBuffer} = require('./pathHelpers')


const { concat: uint8ArrayConcat } = require('uint8arrays/concat');

const DEBUG = false

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

  if (!DEBUG) {
    _ipfs = await IPFS.create({
      silent: true
    });
    return _ipfs
  }

  _ipfs = await IPFS.create({
    repo: 'ok' + Math.random(),
    config: {
      Addresses: address1
    },
    silent: true
  });

  return _ipfs
}


const get = async (frequency, cb) =>  {
  const ipfs = await getIPFS();
  const data = await uint8ArrayConcat(await all(ipfs.cat(frequency)))
  getFileTypeFromBuffer(data, (type) => {
    fs.createWriteStream(getPath(frequency, type)).write(data);
    cb(frequency, type)
  })
}


const addAll = async (path) => {
  const addOptions = {
    pin: true,
    wrapWithDirectory: true,
    timeout: 10000
  };

  const ipfs = await getIPFS();

  for await (const file of ipfs.addAll(globSource(path, '**/*', {
    hidden: false,
    wrapWithDirectory: true
  }), addOptions)) {
    const {path, cid} = file
    console.log(`${cid}      -> ${path}`)
  }
}

module.exports = {
  get,
  addAll
}



  // getFileType(data)

  // console.log('data', data)
  
  // (async () => {
  //   const { fileTypeFromBuffer } = await import('file-type');
  
  //   const type = await fileTypeFromBuffer(data);
  //   console.log(type);
  // })();

  // console.log('[THEDATATATTATA]', data)
  // fs.createWriteStream(getPath(frequency)).write(data);

  // fs.createWriteStream(getPath('huh.txt')).write('huh');
  // console.log("wtf")

  // for await (const file of ipfs.ls(frequency)) {
  //   console.log('FILE: ', file)
  // //   filename = file.path
  // //   const type = filename.split('.')[1]
  // //   var saveFile = `${DRAFTS_PATH}/${filename}`
  // //   console.log('[Saving To Drafts Path] -> ', saveFile)

  // //   // for await (const buf of ipfs.get(file.path)) {
  // //   //   // do something with buf
  // //   //   console.log("BUF", buf.toString('utf8'))
  // //   // }
  //   for await (const chunk of ipfs.cat(frequency)) {
  //       // content.push(chunk.toString('utf8'))
  //       console.log("chunk", chunk.toString('utf8'))
  //       getFileTypeFromBuffer(chunk)
  //       // fs.writeFile(filename, chunk.toString('utf8'))
  //       // savePixels(chunk, type).pipe('test.txt')
  //   }

  // //   // const data = await uint8ArrayConcat(await all(ipfs.cat(frequency)))
  // //   // console.log('datatata', data)

  // //   // fs.createWriteStream('boob.txt').write('huh');
  // }

    // ipfs.files.get(frequency, function (err, files) {
  //   console.log("files", files)
  //   files.forEach((file) => {
  //   console.log(file.path)
  //   console.log("File content >> ",file.content.toString('utf8'))
  //   })
  //   })

    //   for await (const buf of ipfs.get(frequency)) {
    //   // do something with buf
    //   console.log("BUF", buf.toString('utf8'))
    // }
