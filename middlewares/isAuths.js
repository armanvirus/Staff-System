const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }

    token = token.split(" ")[1];
    try {
        const decoded = await jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ msg: "Unauthorized: Invalid token" });
    }
};

module.exports = isAuth;
