// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      console.log(JSON.stringify(req))
      res.redirect("/chat");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      console.log(JSON.stringify(req))
      res.redirect("/chat");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  //Here we setup the route sending them to that chat
  app.get("/chat", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/chat.html"));
  })

  
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/profilepage", isAuthenticated, function (req, res) {
    res.render('home');
  });
  

};
