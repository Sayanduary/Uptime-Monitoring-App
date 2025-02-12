// dependencies

const fs = require('fs');

const path = require('path');


const lib = {};

// base directory of the data folder

lib.baseDir = path.join(__dirname, '/../.data/')

// write data to file

lib.create = (dir, file, data, callback) => {
  // open file for writing
  fs.open(`${lib.baseDir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(data);
      // write data to the file and close it
      fs.writeFile(fileDescriptor, stringData, (err) => {
        if (!err) {
          fs.close(fileDescriptor, (err) => {
            if (!err) {
              callback(false);
            } else {
              callback('Error closing the new file');
            }
          });
        } else {
          callback('Error Writing to new file')
        }
      })
    } else {
      callback(err)
    }
  });
}

lib.readDataFromFile = (dir, file, callback) => {
  fs.readFile(`${lib.baseDir + dir}/${file}.json`, 'utf-8', (err, data) => {
    callback(err, data);
  })
}

//update existing from file
lib.update = (dir, file, data, callback) => {
  // open file for writing
  fs.open(`${lib.baseDir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(data);
      fs.truncate(fileDescriptor, (err) => {
        if (!err) {
          // write to the file close it
          fs.watchFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              fs.close(fileDescriptor, (err) => {
                if (!err) {
                  callback(false);
                } else {
                  callback('Error closing file');
                }
              })
            } else {
              callback(err)
            }
          })
        } else {
          callback(err);
        }
      })
    } else {
      console.log(`Error Updating,File may not exist`);
    }
  })
}

module.exports = lib;