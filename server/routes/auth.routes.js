const Router = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const File = require('../models/File');

const authMiddleware = require('../middleware/auth.middleware');
const fileService = require('../services/fileService');

const router = new Router();

router.post('/registration',
    [
        check('firstName', 'The first name field cannot be empty').not().isEmpty(),
        check('lastName', 'The last name field cannot be empty').not().isEmpty(),
        check('email', "Uncorrect email").isEmail(),
        check('password', "Password must be at least five characters long").isLength({ min: 5 })
    ],
    async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;
            const ifUserExist = await User.findOne({ email });
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Uncorrect request", errors
                });
            }

            if (ifUserExist) {
                return res.status(400).json({
                    message: `User with email ${email} is already exist`,
                });
            }
            const hashedPassword = await bcrypt.hash(password, 8);
            const user = new User({ firstName, lastName, email, password: hashedPassword });
            const token = jwt.sign
                (
                    { id: user.id },
                    config.get('SecretKey'),
                    { expiresIn: '10h' }
                );

            await user.save();
            await fileService.createDir(req, new File({ user: user.id, name: '' }))

            return res.json({

                token,
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
            console.log(err)
        }
    });


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password",
            })
        }

        const token = jwt.sign
            (
                { id: user.id },
                config.get('SecretKey'),
                { expiresIn: '10h' }
            );

        return res.json({
            token,
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
        console.log(err)
    }
});

router.get('/auth', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        const token = jwt.sign
            (
                { id: user.id },
                config.get('SecretKey'),
                { expiresIn: '10h' }
            );
        return res.json({
            token,
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
        console.log(err)
        res.send({ message: 'Server error' })
    }
});

router.put('/profile', authMiddleware, [
    check('firstName', 'The first name field cannot be empty').not().isEmpty(),
    check('lastName', 'The last name field cannot be empty').not().isEmpty(),
    check('email', "Uncorrect email").isEmail(),
    check('phone', "Uncorrect phone").not().isEmpty()
], async (req, res) => {

    try {
        const user = await User.findOneAndUpdate(req.user._id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone
        }, { new: true });

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
        console.log(err)
        res.send({ message: 'Server error' })
    }
});

router.delete('/user', authMiddleware, async (req, res) => {
    try {

        const user = await User.findByIdAndDelete({_id: req.user.id});

        if (!user) {
            return res.status(404).json({ message: 'User not found'})
        }
        fs.rmdirSync(req.filePath + '\\' + user.id);
        return res.json({message: 'User is deleted'})
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' });

    }
});

module.exports = router;