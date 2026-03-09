const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        /* `firstname: {` is defining a subfield within the `fullname` field in the `userSchema`. It
        specifies that the `firstname` subfield should be of type String and is required with a
        minimum length validation of 3 characters. This structure allows for organizing related
        fields within a schema in a nested manner. */
        firstname: {
            type: String,
            required: true,
            minlength: (3,'First name must be at least 3 characters long')
        },
        lastname: {
              type: String,
              required: true,
              minlength: (3,'Last name must be at least 3 characters long')        
        }                                  
    },
    email: {
              type: String,
              required: true,
              unique: true,
              minlength: (5,'Email must be at least 5 characters long')                                
    },
    password: {
        type: String,
        required: true,
        select: false
    }                     
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}   

userSchema.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
