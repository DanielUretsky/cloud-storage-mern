const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(401).json({
                message: 'Authorization error',
            })
        }
        const decodedToken = jwt.verify(token, config.get('SecretKey'));
        req.user = decodedToken;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'Invalid token' });
    }
}