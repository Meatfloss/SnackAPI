var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rateSchema = mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    subject: {
        type: String
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

rateSchema.virtual('createdAt').get(function(){
    return this._id.getTimestamp();
});

rateSchema.set('toJSON', {
    virtuals: true
 })

//  rateSchema.set('toObject', {
//     virtuals: true
//  })

var Rate = module.exports = mongoose.model('Rate', rateSchema);

module.exports.GetRates = function (ids, callback) {
    Rate.find(
        {
            '_id': {
                $in: ids
            }
        },
        null,
        { virtuals: true },
        callback
    );
};

module.exports.GetSnackRates = function (snackId, callback, skipNum = 0, limit = 10) {
    Rate.find(
        {
            'snack_id': snackId
        },
        callback
    ).sort({_id: -1}).skip(skipNum).limit(limit);
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