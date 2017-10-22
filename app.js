var express = require('express');
var app = express();
var bodyPaser = require('body-parser');
var mongoose = require('mongoose');

var Food = require('./models/food.js');
var Address = require('./models/address.js');

app.use(bodyPaser.json());
//connect to mongoose
mongoose.connect('mongodb://localhost/specialfood');
var db = mongoose.connection;

app.get('/', function(req, res){
    res.send('Please use /api/food');
});

app.get('/api/snacks', function(req, res){
    Food.GetFoods(function(err, food){
        if(err)
        {
            Console.log(err);
        }
        res.json(food);
    });
});
app.get('/api/snacks/:id', function(req, res){
    Food.GetFood(req.params.id, function(err, food){
        if(err)
        {
            Console.log(err);
        }
        res.json(food);
    });
});
app.post('/api/snacks', function(req, res){
    var food = req.body;
    Food.AddFood(food, function(err, food){
        if(err)
        {
            Console.log(err);
        }
        res.json(food);
    });
});
app.put('/api/snacks/:id', function(req, res){
    var id = req.params.id;
    var food = req.body;
    Food.UpdateFood(id, food, {}, function(err, food){
        if(err)
        {
            Console.log(err);
        }
        res.json(food);
    });
});
app.delete('/api/snacks/:id', function(req, res){
    var id = req.params.id;
    Food.DeleteFood(id,  function(err, food){
        if(err)
        {
            Console.log(err);
        }
        res.json(food);
    });
});
app.get('/api/addresses', function(req, res){
    Address.GetAddress(function(err, address){
        if(err)
        {
            Console.log(err);
        }
        res.json(address);
    });
});

app.listen(3000);



console.log('Running on port 3000...');