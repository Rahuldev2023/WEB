const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
 
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstname=req.body.fn;
    const lastname=req.body.ln;
    const email=req.body.e;

    const data={
        //data objects
        members:[ {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }

            }
        ]
    };
        const jsonData=JSON.stringify(data);//object to string
        const url="https://us21.api.mailchimp.com/3.0/lists/6b4699bcd3";

        const options={
            method:"POST",
            auth:"rahul23:5f0980d11e261776fb1af5e970cbbfed-us21"
        };

        const request=https.request(url,options,function(response){
           if(response.statusCode === 200){
                res.sendFile(__dirname+"/success.html");
           }
           else{
            res.sendFile(__dirname+"/failure.html");
           }
            response.on("data",function(data){
                console.log(JSON.parse(data));
            });

             });

            request.write(jsonData);
            request.end();

});


app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT ||3000,function(){
    console.log("Server Running.......");
});


//api-key:4b5e4e6c6af73ee251f1e7a0c6a1c139-us21
//audience list-id:6b4699bcd3.