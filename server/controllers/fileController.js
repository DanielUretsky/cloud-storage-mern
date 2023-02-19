const config = require('config');
const fs = require('fs');
const archiver = require('archiver');
const Uuid = require('uuid');

const fileService = require('../services/fileService');
const User = require('../models/User');
const File = require('../models/File');

class FileController {
    async createDir(req, res) {
        try {
            const { name, type, parent } = req.body;
            const file = new File({ name, type, parent, user: req.user.id });
            const parentFile = await File.findOne({ _id: parent });

            if (!parentFile) {
                file.path = name;
                await fileService.createDir(req, file);
            }
            else {
                file.path = `${parentFile.path}\\${file.name}`;
                await fileService.createDir(req, file);
                parentFile.childs.push(file._id);
                await parentFile.save();
            }
            await file.save();
            return res.json(file)
        } catch (err) {
            console.log(err);
            return res.status(400).json(err)
        }
    }

    async getFiles(req, res) {
        try {
            const { sort } = req.query;
            let files;
            switch (sort) {
                case "name":
                    files = await File.find({
                        user: req.user.id,
                        parent: req.query.parent,
                    }).sort({ name: 1 });
                    break;
                case "size":
                    files = await File.find({
                        user: req.user.id,
                        parent: req.query.parent,
                    }).sort({ size: -1 });
                    break;
                case "date":
                    files = await File.find({
                        user: req.user.id,
                        parent: req.query.parent,
                    }).sort({ date: -1 });
                    break;


                default:
                    files = await File.find({
                        user: req.user.id,
                        parent: req.query.parent,
                    });
                    break;
            }

            return res.json(files);

        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Can not get file',
            })
        }
    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file;

            const parent = await File.findOne({
                user: req.user.id,
                _id: req.body.parent
            });

            const user = await User.findOneAndUpdate({ _id: req.user.id },
                { $inc: {usedSpace: file.size}}, {new: true});

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({
                    message: 'No disk space',
                });
            }

            let path;
            if (parent) {
                path = `${req.filePath}\\${user._id}\\${parent.path}\\${file.name}`;
                await File.findOneAndUpdate(
                    { _id: parent._id },
                    { $inc: { size: file.size } },
                  );
            }
            else {
                path = `${req.filePath}\\${user._id}\\${file.name}`;
            }

            if (fs.existsSync(path)) {
                return res.status(400).json({
                    message: 'File already exist',
                });
            }

            file.mv(path);

            const type = file.name.split('.').pop();
            let filePath = file.name;

            if (parent) {
                filePath = parent.path + "\\" + file.name;
            }

            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                parent: parent ? parent._id : null,
                user: user._id,
            });

            
            await dbFile.save();
            await user.save();
            res.json({
                file: dbFile,
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Upload file error',
            })
        }
    }

    async downloadFile(req, res) {
        try {
            const file = await File.findOne({
                _id: req.query.id,
                user: req.user.id,
            });
            const path = fileService.getPath(req, file);
            if (fs.existsSync(path)) {
                if (fs.lstatSync(path).isDirectory()) {
                    const archive = archiver('zip', { zlib: { level: 9 } });
                    archive.directory(path, file.name);
                    res.attachment(file.name + '.zip');
                    archive.pipe(res);
                    archive.finalize();
                } else {
                    return res.download(path, file.name);
                }
            } else {
                return res.status(400).json({
                    message: 'Download error',
                });
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: 'Download error',
            })
        }
    }

    async deleteFile(req, res) {
        try {
            const file = await File.findOne({
                _id: req.query.id,
                user: req.user.id,
            });

            const parent = await File.findOne({
                user: req.user.id,
                _id: file.parent
            });

            const user = await User.findOne({ _id: req.user.id })
            
            if (!file) {
                return res.status(400).json({
                    message: 'file not found',
                });
            }

            if(parent) {
                parent.size = parent.size - file.size;
                await parent.save();
            }
            user.usedSpace = user.usedSpace - file.size;
            await fileService.deleteFile(req, file);
            await file.remove();


            await user.save();
            return res.json({
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    async searchFile(req, res) {
        try {
            const searchName = req.query.search;
            let files = await File.find({
                user: req.user.id
            });
            files = files.filter(file => file.name.includes(searchName));
            return res.json(files);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Search error',
            })
        }
    }

    async uploadAvatar(req, res) {
        try {
            const file = req.files.file;
            const user = await User.findById(req.user.id);
            const avatarName = Uuid.v4() + '.jpg';

            file.mv(config.get('staticPath') + '\\' + avatarName);
            user.avatar = avatarName;
            await user.save();

            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Uploading error',
            })
        }
    }

    async deleteAvatar(req, res) {
        try {

            const user = await User.findById(req.user.id);
            fs.unlinkSync(config.get('staticPath') + '\\' + user.avatar);
            user.avatar = null;

            await user.save();

            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Delete error',
            })
        }
    }
}

module.exports = new FileController();