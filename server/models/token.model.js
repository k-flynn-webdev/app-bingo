const mongoose = require('mongoose');

var token = mongoose.Schema({
	raw: { type: String, required: true }
})

module.exports = mongoose.model('Token', token);