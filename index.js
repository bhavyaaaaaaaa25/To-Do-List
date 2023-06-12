const express = require("express");
const bodyParser = require("body-parser");

var itemarray=[];   //array to store the tasks

const app = express();

app.set("view engine", "ejs");   //for ejs

app.use(bodyParser.urlencoded({extended:true})); //this statement is important to be able to get the value from ejs or html file and print
app.use(express.static("public")); // so that our server can access css files etc
app.get("/", function (req, res) {  //requests are received
  var today = new Date();    // in built function to get today's date

  var dateFormat = {        //storing as a json object in this mentioned format
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  };

  var day = today.toLocaleDateString("en-US", dateFormat);

  //   switch (today.getDay()) {
  //     case 0:
  //       day = "Sunday";
  //       break;
  //     case 1:
  //       day = "Monday";
  //       break;
  //     case 2:
  //       day = "Tuesday";
  //       break;
  //     case 3:
  //       day = "Wednesday";
  //       break;
  //     case 4:
  //       day = "Thursday";
  //       break;
  //     case 5:
  //       day = "Friday";
  //       break;
  //     case 6:
  //       day = "Saturday";
  //       break;

  res.render("list", { keyday: day, newItemArrayInEjs:itemarray}); // render method instead of res.sendFile(for HTML file) is for ejs. when we pass this method, we are looking for a list file into the views folder and then for a key value pair where keyday is the key whose value is here with the varibale name day
});


app.post("/",function(req,res){  //this is for when something is posted on the html or ejs page and we want to display it through the site
    var item= req.body.new;
    itemarray.push(item);
    
    // console.log(item);
res.redirect("/");   //will take to app.get

})



app.post("/delete",function(req,res){
  
  
  var item= req.body.new;
  itemarray.pop(item);
  res.redirect("/"); 
})
app.listen(3000, function () {
  console.log("The port is 3000");
});
