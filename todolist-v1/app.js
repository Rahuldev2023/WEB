const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const date=require(__dirname+"/date.js");
const app=express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use((req, res, next) => {
    const currentDate = date.getDate();
    res.locals.currentDate = currentDate;
    next();
  });

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.3");


//items schema
const itemSchema=new mongoose.Schema({
    name:String
});

//listschema
const listSchema=new mongoose.Schema({
    name:String,
    items:[itemSchema]
});

//items model
const Item=mongoose.model("Item",itemSchema);
//List Model
const List=mongoose.model("List",listSchema);


//creating items or documents
const item1= new Item({
name:"Welcome"
})
const item2= new Item({
    name:"click+ to add"
})
const item3= new Item({
        name:"hit this to delete"
})

//array to store default items
const defaultItems=[item1,item2,item3];



app.get("/",(req,res)=>{
    //find() mongoose method with .exec() and then()
    Item.find({}).exec().then((foundItems) => {
        
            //checking if the array is empty or not
            if(foundItems.length === 0){
                //mongoose insertMany() function with error messages
                Item.insertMany(defaultItems)
                .then(result=>{
                    console.log("Documents inserted successfully!");
                })
                .catch((error) => {
                    console.error('Error inserting documents:', error);
                });
                //after inserting re-routing to home route to update the db
                res.redirect("/");
            }else{
                //if not empty rendering the items that are present in the list
                res.render("list",{ listTitle: "Today", newListItems: foundItems });
            }
        
    }).catch(error => {
      console.error(error);
    });
});

//creating customLists with express routes and checking with findOne whether any list already exists !
app.get("/:customListName", (req, res) => {
    const customListName = req.params.customListName;
  
    List.findOne({ name: customListName })
      .then(foundList => {
        if (!foundList) {
            const list = new List({
            name: customListName,
            items: defaultItems
          });
          list.save();
          //without redirecting to the custom List document the page cannot be loaded
          res.redirect("/"+ customListName);
        } else {
            res.render("list",{ listTitle: foundList.name, newListItems:foundList.items });
        }
      })
      .catch(error => {
        console.error(error); 
      });
  });
  

  app.post("/", (req, res) => {
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
      name: itemName
    });
  
    if (listName === "Today") {
      item.save();
      res.redirect("/");
    } else {
      // Find the list by name
      List.findOne({ name: listName }).then((foundList) => {
        if (foundList) {
          // If the list exists, push the item and save the list
          foundList.items.push(item);
          foundList.save();
          res.redirect("/" + listName);  
        }
    })
  }
})

app.post("/delete",(req,res)=>{
const checkedItemId= req.body.checkbox;
//findByIdAndRemove removes the checked item and removes the document from the items collection
Item.findByIdAndRemove(checkedItemId).then(result=>{
    console.log("Documents deleted successfully!");
})
.catch((error) => {
    console.error('Error inserting documents:', error);
});
res.redirect("/");
});


app.listen(3000,()=>{
    console.log("server running....");
});