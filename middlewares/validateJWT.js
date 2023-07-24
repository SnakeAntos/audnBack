const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    // get token from request
    const token = req.body.token || req.query.token || req.headers["audn-access-token"];
    // check if token exist
    if (!token) {
        return res.status(401).send( 'Acceso denegado.' );
    }
    try {
        // verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // modify request to add user information
        req.user = verified;
        // continue
        next();
    } catch (error) {
        // log error
        console.error(error);
        // send response
        return res.status(400).send('El token no es válido.');
    }
}

module.exports = verifyToken;
