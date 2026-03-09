const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports.authUser  = async (req, res, next) => {
              const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
              if (!token){
                            return res.status(401).json({message: 'No token provided, authorization denied'});
              }

              const isBlacklisted = await blacklistTokenModel.findOne({ token });
              if (isBlacklisted) {
                            return res.status(401).json({message: 'Token is blacklisted, authorization denied'});
              }

              try {
                            const decoded = jwt.verify(token, process.env.JWT_SECRET);
                            const user = await userModel.findById(decoded.id);
                            req.user = user;
                            next();
               }
               catch (error){
                            return res.status(401).json({message: 'Invalid token, authorization denied'});
               }
              
               
}

 