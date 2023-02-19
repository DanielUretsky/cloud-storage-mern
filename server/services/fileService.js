const fs = require('fs');
const File = require('../models/File');
const config = require('config');



class FileService {
    createDir(req, file) {
        const filePath = this.getPath(req, file);
        return new Promise(((resolve, reject) => {
            try {
                if(!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                    return resolve({
                        message: 'File created',
                    })
                }
                else {
                    return reject({
                        message: 'This file already exist',
                    })
                }
            } catch (err) {
                return reject({
                    message: 'File error'
                })
            }
        }))
    }

   async deleteFile(req, file) {
        const path = this.getPath(req, file);
        return new Promise(async (resolve, reject) => {
        try {
            if(file.type === 'dir') {
                const parent = await File.find({ parent: file._id });
                for (const child of parent) {
                    await this.deleteFile(req, child);
                    await child.remove()
                }
                
                fs.rmdirSync(path)
                
                return resolve({
                    message: 'Folder deleted',
                    
                })
            }
            else {
                fs.unlinkSync(path);
                return resolve({
                    message: 'File deleted', 
                })
            }
        } catch (err) {
            console.log(err);
            return reject({
                message: 'Delete error'
            })
        }
    })
}

    getPath(req, file) {
        return req.filePath + '\\' + file.user + '\\' + file.path;
    }
}

module.exports = new FileService();