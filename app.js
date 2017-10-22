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

app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

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