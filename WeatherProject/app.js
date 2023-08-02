// Weather Project 
const { log } = require("console");
const express= require("express");
const https= require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
});


app.post("/",function(req,res){
    const apiKey="4234aeb44c2f940a759d2e701e4a39f2";
    const query=req.body.cityName;
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+apiKey+"&units="+units; 
    https.get(url,function(response){
        console.log(response.statusCode);
            response.on("data",function(data){
            const weatherdata= JSON.parse(data);
            const temp=weatherdata.main.temp;
            const des=weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        
            res.write("<p> The weather is currently "+ des+"</p>");
            res.write("<h1> The temperature in "+query+" currently is "+ temp +"</h1>");
            res.write("<img src="+imageURL+">");
            res.send();
        });

    });
    
});


app.listen(3000,function(){
    console.log("Server is  running.........");
})