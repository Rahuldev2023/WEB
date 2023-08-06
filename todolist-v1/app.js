const express=require("express");
const bodyParser=require("body-parser");

const app=express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

let items=["STUDY","EAT","CHILL"];
let workItems=[];


app.get("/",(req,res)=>{
    var today= new Date();
      
    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };

    var day=today.toLocaleDateString("en-US",options); 
    res.render("list",{ listTitle: day, newListItems: items });

});


app.get("/work",(req,res)=>{
    res.render("list",{ listTitle:"Work List",newListItems: workItems  });
});


app.post("/",(req,res)=>{
   let item=req.body.newItem; 


    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{

        items.push(item);
        res.redirect("/");
    }  

});


app.listen(3000,()=>{
    console.log("server running....");
});