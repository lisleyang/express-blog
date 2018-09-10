var mongoose = require('mongoose');
var userSchema = require('../schemas/user.js');

module.exports = mongoose.model('User',userSchema)