const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const questionSchema = new mongoose.Schema(
  {
    index: { type: Number, required: true, },
    question: { type: String, required: true, maxlength: 30 },
    answer: { type: String, required: true },
    role: { type: String, required: true },
    triesCount: { type: Number, default: '1' },
    rightCount: { type: Number, default: '1' }
  },
  { timestamps: true },
);

questionSchema.plugin(uniqueValidator);

const Questions = mongoose.model('Questions', questionSchema);

module.exports = Questions;
