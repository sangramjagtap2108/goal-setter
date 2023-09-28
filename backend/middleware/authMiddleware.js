const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req,res,next) => {

    let token
    // token always starts with - Bearer (Bearer token)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1];
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // get user from the token
            // -password - will not take password
            req.user = await User.findById(decoded.id).select('-password');
            // req.user will be needed in getMe() for getting loggedin/register user
            next();

        } catch (error) {
            console.log(error);
            res.status(401);
            // if wrong token is sent
            throw new Error('Not authorized');
        }
    }
    if(!token){
        res.status(401);
        // if token is not sent
        throw new Error('Not authorized, no token');
    }
// Basically this function helps to get only authorized users
// when user logs in, token will be sent to client and that token is used to get user(getMe) via protect middleware
}

);

module.exports = { protect };