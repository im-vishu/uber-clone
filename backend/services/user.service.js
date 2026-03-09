const userModel = require('../models/user.model');




module.exports.createUser = async ({
              firstname,
              lastname,
              email,
              password
}) => {
           if (!firstname || !email || !password) {
              throw new error('All fields are required');

           }
           const user = new userModel.create({
              fullname: {
                 firstname,
                 lastname
               },
               email,
               password
           })
              return user;
}