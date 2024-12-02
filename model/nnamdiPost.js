const mongoose = require('mongoose');

const nnamdiPostSchema = new mongoose.Schema({
title: {
  type: String,
  required: true,
  trim: true,
},
content: {
  type: String,
  required: true,
},
category: {
    type: String,
    required: true
},
image: {
    type: String,
    required: true
},
author: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'nnamdiUser',
  required: true,
},
createdAt: {
  type: Date,
  default: Date.now,
},
updatedAt: {
  type: Date,
},
});

module.exports = mongoose.model('nnamdiPost', nnamdiPostSchema);