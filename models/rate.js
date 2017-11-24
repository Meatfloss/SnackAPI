var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rateSchema = mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    user_name: {
        type: String
    },
    snack_id: {
        type : Schema.ObjectId,
        required: true
        //ref: 'Food'
    }
});

var Rate = module.exports = mongoose.model('Rate', rateSchema);

module.exports.GetRates = function (ids, callback) {
    Rate.find(
        {
            '_id': {
                $in: ids
            }
        },
        callback
    );
};

module.exports.GetSnackRates = function (snackId, callback) {
    Rate.find(
        {
            'snack_id': snackId
        },
        callback
    );
};

module.exports.GetAllRates = function (callback, limit) {
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

module.exports.DeleteSnackRate = function (snackId, callback) {
    var query = { _id: id }
    Rate.remove(query, callback);
};