const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :false}));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.set("views",__dirname + "/apps/views");
y
app.use("/static",express.static(__dirname+"/public"));

const controllers = require("./apps/controllers");

const host = config.get("server.host");
const port = config.get("server.port");

app.use(controllers);

app.listen(port, host , () => {
    console.log("Server is running on port ",port ); 
});

