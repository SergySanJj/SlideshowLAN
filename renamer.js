const fs = require('fs')
const path = require('path')

function renameAllInDir(dir, renameDirs = false) {
    let files = []
    fs.readdirSync(folder).forEach(file => {
        files.push(file)
    });

    for (let i = 0; i < files.length; i++) {
        // Skips dirs if needed
        if (!renameDirs) {
            if (path.extname(files[i] === ''))
                continue;
        }

        let fileName = files[i]
        let filePath = path.join(folder, fileName)
        let newName = i + path.extname(fileName)
        let newPath = path.join(folder, newName)

        fs.rename(filePath, newPath, function (err) {
            if (err) {
                console.log('ERROR: ' + err);
                throw err;
            }
            console.log(`${fileName} renamed to ${newName}`);
        });
    }
}

module.exports = { renameAllInDir }