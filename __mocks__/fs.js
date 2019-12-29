// // __mocks__/fs.js
// 'use strict';

// const path = require('path');

// const fs = jest.genMockFromModule('fs');

// // This is a custom function that our tests can use during setup to specify
// // what the files on the "mock" filesystem should look like when any of the
// // `fs` APIs are used.
// let mockFiles = Object.create(null);

// function __setMockFiles(newMockFiles) {
//   mockFiles = Object.create(null);
//   for (const file in newMockFiles) {
//     const dir = path.dirname(file);

//     if (!mockFiles[dir]) {
//       mockFiles[dir] = [];
//     }
//     mockFiles[dir].push(path.basename(file));
//   }
// }

// // A custom version of `readdirSync` that reads from the special mocked out
// // file list set via __setMockFiles
// function readdirSync(directoryPath) {
//   return mockFiles[directoryPath] || [];
// }

// fs.__setMockFiles = __setMockFiles;
// fs.readdirSync = readdirSync;

// module.exports = fs;

const fs = jest.genMockFromModule('fs')
// fs.x = () => {
// console.log('hi')
// return 'hi'

// }

const _fs = jest.requireActual('fs')


Object.assign(fs, _fs)

const mocks = {}

fs.setMock = (path, error, data) => {
  mocks[path] = [error, data]
}
fs.readFile = (path, options, callback) => {
  if (callback === undefined) {
    callback = options
  }
  if (path in mocks) {
    callback(...mocks[path])
  } else {
    _fs.readFile(path, option, callback)

  }
}

fs.setWriteFileMock = (path, error, data) => {
  writeMocks[path] = [error, data]
}

fs.writeFile = (path, data, options, callback) => {
  if (path in writeMocks) {
    writeMocks[path](path, data, options, callback)
  } else {
    _fs.writeFile(path, data, options, callback)
  }
}
module.exports = fs