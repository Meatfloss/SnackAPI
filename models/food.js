var mongoose = require('mongoose');

var foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    description: {
        type: String,
    },
    price: {
        type: String,
    },
    //vendors:
    // location_city: {
    //      type: String
    //  },
    //  location_province:{
    //      type: String
    //  },
    taste: {
        type: Array
    },
    texture: {
        type: Array
    },
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

module.exports.UpdateFood = function (id, update, options, callback) {
    var query = { _id: id };
    //var update = { name: food.name, image_url: food.image_url };
    Food.findOneAndUpdate(query, update, options, callback);
};

module.exports.UpdateAverageRate = function (id, averageRate, options, callback) {
    var query = { _id: id };
    var update = { average_rate: averageRate};
    Food.findOneAndUpdate(query, update, options, callback);
};

module.exports.DeleteFood = function (id, callback) {
    var query = { _id: id }
    Food.remove(query, callback);
};

//get rates
module.exports.GetRates = function (id, callback, limit) {
    Food.findById(id).rates.find(callback).limit(limit);
    Food.rates.find(callback).limit(limit);
};

//create rate
module.exports.AddRate = function (id, rate, callback, limit) {
    var rateId = Rate.create(rate);
    Food.update({_id: id}, {$push: { rates: rate }}, callback);
    //Food.findById(id).rates.find(callback).limit(limit);
    //Food.rates.find(callback).limit(limit);
};


// comment.save(function(err, comment) {
//     if (err) return res.send(err);
//     Post.findById(req.params.postId, function(err, post) {
//       if (err) return res.send(err);
//       post.commentIds.push(comment);
//       post.save(function(err) {
//         if (err) return res.send(err);
//         res.json({ status : 'done' });
//       });
//     });
//   });