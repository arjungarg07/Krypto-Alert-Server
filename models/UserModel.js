const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  username: {
    type: String,
    required: true,
    unique: [true, 'This username is already taken!'],
    lowercase: true,
  },
  pwdHash: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: [true, 'This email id is already taken.'],
  },
});
  
const User = mongoose.model('User', userSchema);
module.exports = User;