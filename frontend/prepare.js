const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');

function main() {
    const publicDir = path.join(__dirname, 'public');
    const existingDir = fs.existsSync(publicDir) && fs.statSync(publicDir);
    if (existingDir && existingDir.isDirectory) {
        fsExtra.removeSync(publicDir);
    }
    fsExtra.copySync(path.join(__dirname, 'env', 'public'), publicDir);
    if (process.env.NODE_ENV) {
        const envPath = path.join(__dirname, 'env', process.env.NODE_ENV);
        const envDir = fs.statSync(envPath);
        if (envDir && envDir.isDirectory) {
            fsExtra.copySync(envPath, publicDir);
        }
    }
}

main();
