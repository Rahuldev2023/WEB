const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
 
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
var firstname=req.body.fn;
var lastname=req.body.ln;
var email=req.body.e;

console.log(firstname,lastname,email);
});

app.listen(3000,function(){
    console.log("Server Running.......");
});