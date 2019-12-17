const fs = require('fs');
const path = require('path');


// Sync recoursive reading directory
module.exports.readDirFilesTreeSync = (dir) => {
    return fs.statSync(dir).isDirectory()
        ? Array.prototype.concat(...fs.readdirSync(dir).map(f => this.readDirFilesTreeSync(path.join(dir, f))))
        : dir;
}

