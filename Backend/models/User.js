const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, default: 'player' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: Number, default: 0 },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
