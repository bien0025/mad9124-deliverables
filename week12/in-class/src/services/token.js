const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const sign = (user) => 
    jwt.sign(user, JWT_SECRET, {expiresIn: '1h'});  

const verify = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new UnauthorizedError('NOOO');   
    }
}

module.exports = {
    sign,
    verify,
};