// dependencies

const fs = require('fs');

const path = require('path');


const lib = {};

// base directory of the data folder

lib.baseDir = path.join(__dirname, '/../.data/')

// write data to file


lib.create = (dir, file, data, callback) => {
  const filePath = `${lib.baseDir + dir}/${file}.json`;
  // Ensure directory exists
  fs.mkdir(path.dirname(filePath), { recursive: true }, (mkdirErr) => {
    if (mkdirErr) {
      return callback('Error creating directory');
    }

    // Open file for writing
    fs.open(filePath, 'wx', (err, fileDescriptor) => {
      if (err || !fileDescriptor) {
        return callback('File may already exist or cannot be created');
      }

      // Convert data to JSON
      const stringData = JSON.stringify(data, null, 2);

      // Write to file
      fs.writeFile(fileDescriptor, stringData, (writeErr) => {
        if (writeErr) {
          return callback('Error writing to file');
        }

        // Close the file
        fs.close(fileDescriptor, (closeErr) => {
          if (closeErr) {
            return callback('Error closing the file');
          }
          callback(false); // Success
        });
      });
    });
  });
};


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
      fs.ftruncate(fileDescriptor, (err) => {
        if (!err) {
          // write to the file close it
          fs.writeFile(fileDescriptor, stringData, (err) => {
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

lib.deleteExistingFile = (dir, file, callback) => {
  // unlink file
  fs.unlink(`${lib.baseDir + dir}/${file}.json`, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback('Error deleting file');
    }
  })
}
module.exports = lib;