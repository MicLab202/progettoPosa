const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({mess: 'Accesso negato. Nessun token fornito.'})
    }
    try {
        const decoded = jwt.verify(token, 'key');
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (e) {
        res.status(401).json({mess: 'token non valido'})
    }

}

module.exports = authMiddleware;