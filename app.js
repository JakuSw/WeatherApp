const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

const apiid = '';

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.render('weather', {weather: null, error: null})
});

app.post('/', function (req, res){
    console.log('Making request to API');
    let city = req.body.city;
    let requestURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiid}`;
    request(requestURL, function(err, response, body){
        if(err){
            res.render('weather', {weather: null, error: 'Error'});
        } else{
            let weather = JSON.parse(body);
            if(weather.cod == 404){
                res.render('weather', {weather: null, error: 'Error, please check input'});
            }else{
                res.render('weather', {weather: weather, error: null});
            }
        }
    })
});

app.listen(3000);