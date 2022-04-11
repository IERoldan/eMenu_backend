const secret = require('../config/config').secret;
const jwt = require('jsonwebtoken');

const validationAuthenticator = (req, res, next) =>{
    const token = req.headers.authorization;
    jwt.verify(token, secret, (error, jwtdecoded)=>{
        if(error) return res.status(400).send({
            ok:false,
            msg:'Error de validación en token'
        })
        req.user = jwtdecoded
        next();
    });
};

module.exports = validationAuthenticator;
