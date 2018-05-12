

// Requiring necessary npm packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
var exphbs = require("express-handlebars")
var socket = require('socket.io');
// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");


// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// var server = app.listen(PORT);
//Handlebars init
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
db.sequelize.sync().then(function () {
});

var server = app.listen(PORT, function () {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});

var io = socket(server);



io.on('connection', function (socket) {
  console.log('made connection' + socket.id);

  socket.on('chat', function (data) {
    io.emit('chat', data);
  })

});