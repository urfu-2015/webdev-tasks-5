var mongoose = require('../scripts/mongooseConnect.js');

module.exports = mongoose.model('TODO', {text: String});
