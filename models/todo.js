var mongoose = require('../scripts/mongooseConnect.js');
var Schema = mongoose.Schema;

module.exports = mongoose.model('TODO', {
    text: String,
    prev: Schema.Types.ObjectId,
    next: Schema.Types.ObjectId
});
