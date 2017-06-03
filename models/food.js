var mongoose = require('mongoose');

var foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    //vendors:
    // location_city: {
    //      type: String
    //  },
    //  location_province:{
    //      type: String
    //  },
    create_date: {
        type: Date,
        default: Date.now
    },
    average_rate: {
        type: Number
    },
    image_url: {
        type: String
    }


});

var Food = module.exports = mongoose.model('Food', foodSchema);

module.exports.GetFoods = function (callback, limit) {
    Food.find(callback).limit(limit);
};

module.exports.GetFood = function (id, callback) {
    Food.findById(id, callback);
};

module.exports.AddFood = function (food, callback) {
    Food.create(food, callback);
};

module.exports.UpdateFood = function (id, food, options, callback) {
    var query = { _id: id };
    var update = { name: food.name, image_url: food.image_url };
    Food.findOneAndUpdate(query, update, options, callback);
};

module.exports.DeleteFood = function (id, callback) {
    var query = { _id: id }
    Food.remove(query, callback);
};