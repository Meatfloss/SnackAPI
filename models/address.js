var mongoose = require('mongoose');

var addressSchema = mongoose.Schema({
    country: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    Address1: {
        type: String
    },
    Address2: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }


});

var Address = module.exports = mongoose.model('Address', addressSchema);

module.exports.GetAddress = function (callback, limit) {
    Address.find(callback).limit(limit);
};