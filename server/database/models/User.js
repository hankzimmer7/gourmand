const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs'); //Used for hashing the password
mongoose.promise = Promise

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  account_type: { type: String, required: true, default: 'basic' },
  city: String,
  state: String
});

// Define schema methods
userSchema.methods = {
  checkPassword: function (inputPassword) {
  return bcrypt.compareSync(inputPassword, this.password)
},
  hashPassword: plainTextPassword => {
  return bcrypt.hashSync(plainTextPassword, 10)
  }
}

//This is commented out until I need to hash the password
// Define pre-hooks for the save method
userSchema.pre('save', function (next) {
  if (!this.password) {
    console.log('models/user.js =======NO PASSWORD PROVIDED=======')
    next()
  } else {
    console.log('models/user.js hashPassword in pre save');
    this.password = this.hashPassword(this.password)
    next()
  }
})

const User = mongoose.model("User", userSchema);

module.exports = User