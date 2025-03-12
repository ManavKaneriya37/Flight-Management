const jwt = require('jsonwebtoken')

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        req.user = decoded;
        next();

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }

}