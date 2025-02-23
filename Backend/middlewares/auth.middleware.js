const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}