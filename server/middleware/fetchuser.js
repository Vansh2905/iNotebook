const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = JWT.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};
module.exports = fetchuser;
