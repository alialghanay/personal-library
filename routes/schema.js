const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const c1Schema = new mongoose.Schema({
    comments: [{
        type: String
    }],
    title: {
        type: String,
        required: true
    },
    commentcount: {
        type: Number,
        default: 0
    }
  });

  module.exports = mongoose.model('c1', c1Schema);