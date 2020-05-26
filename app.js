const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const http = require("https");
//94100

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// get login details 
app.get("/",(req,res)=>{
  res.render("login");
});

var number
// post login details 
app.post("/login",(req,res)=>{
 number = req.body.number
var jsonData = "91"+number;

var url ="/api/v5/otp?authkey=277534AbKPqJ0Ts0P5ce299d5&template_id=5ec4d606d6fc052da568001a&invisible=1&otp_length=5&otp_expiry=2&mobile="
var customUrl = url + jsonData
var options = {
  "method": "GET",
  "hostname": "api.msg91.com",
  "port": null,
  "path": customUrl,
  "headers": {
    "content-type": "application/json"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
res.redirect("/verify");
});

//get verification
app.get("/verify",(req,res)=>{
  res.render("verify");
});

//post verification
app.post("/verify",(req,res)=>{
  // console.log(number)
  var otp = req.body.otp;
  url="/api/v5/otp/verify?mobile=91"
  addmobile = url+number+"&otp=";
  fullUrl = addmobile+otp+"&authkey=277534AbKPqJ0Ts0P5ce299d5";
  // console.log(addmobile);
  // console.log(fullUrl)
  var options = {
  "method": "POST",
  "hostname": "api.msg91.com",
  "port": null,
  "path": fullUrl,
  "headers": {}
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
res.send("Thanks you for subscribing");
});


app.listen(3000,function(){
  console.log("Server is running successfully");
});
