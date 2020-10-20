const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;