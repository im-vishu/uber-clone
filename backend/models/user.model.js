const mongoose = require('mongoose');


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
        required: true
    }                     
});