var mongoose = require('mongoose');

var rateSchema = mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    userName:{
        type: String
    }
});

var Rate = module.exports = mongoose.model('Rate', rateSchema);

module.exports.GetRates = function (callback, limit) {
    Rate.find(callback).limit(limit);
};

module.exports.GetRate = function (id, callback) {
    Rate.findById(id, callback);
};

module.exports.AddRate = function (rate, callback) {
    Rate.create(rate, callback);
};

module.exports.UpdateRate = function (id, rate, options, callback) {
    var query = { _id: id };
    var update = { name: rate.name, image_url: rate.image_url };
    Rate.findOneAndUpdate(query, update, options, callback);
};

module.exports.DeleteRate = function (id, callback) {
    var query = { _id: id }
    Rate.remove(query, callback);
};