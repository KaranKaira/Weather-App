const   express = require("express");
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){

    res.sendFile(__dirname + '/index.html');
   
});

app.post('/' , function(req,res){

    var city = req.body.city;
    // api key hidden
    const apiKey = "api_key";
    const unit= "metric";

    var url = 'https://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&q=' + city + '&units=' + unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on('data',function(data){

            const weatherData = JSON.parse(data);
            //JSON.stringify() opposite of JSON.parse()
            const temperature = weatherData.main.temp;
            // console.log(temperature);
            const weatherDescription = weatherData.weather[0].description;
            // console.log(weatherDescription);
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>" + "Temperature of  " + city +' ' + temperature + "</h1>");
            res.write( "<h2>" + " and it feels like " + weatherDescription + "</h2>");
            res.write('<img src=' + imageURL + '>');
            res.send();            
        })
    });
});
 



app.listen(3000,function(){
    console.log("Server started on 3000");
});