const { append } = require("express/lib/response");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname+"/date.js");
const request = require("request");
const { use } = require("express/lib/application");
const res = require("express/lib/response");
const getDate = require("./date");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine","ejs");

const items=["Buy grocery","Cook food","Go to gym"]; 
const workItems =[];

app.get("/",function(req,res)
{
   
    const day = date.getDate();

    res.render("index",{listTitle : day,newListItem:items});
});

app.post("/",function(req,res)
{
  //  console.log(req.body);
    const item = req.body.newItem;
    if(req.body.List==="Work List")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else{
    items.push(item);
    res.redirect("/");
    }
    
});

app.get("/work",function(req,res)
{
    res.render("index",{listTitle:"Work List",newListItem:workItems});
});

app.get("/about",function(req,res)
{
    res.render("about");
});


app.listen("3000",function(req,res)
{
    console.log("Server started on port 3000");
});
