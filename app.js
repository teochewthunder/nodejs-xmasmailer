var express = require("express");

var app = express();

var handlebars = require("express-handlebars").create({defaultLayout:"main"});
app.engine("handlebars", handlebars.engine);

app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

app.use(require("body-parser")());
app.use(require("cookie-parser")(credentials.cookieSecret));
app.use(require("express-session")());
app.use(require("csurf")());


app.get("/", function(req, res) {
	res.render("form");
});

app.get("/thankyou", function(req, res) {
	res.render("thankyou");
});

app.post("/process", function(req, res) {
	console.log(req.body);
	res.redirect(303, "/thankyou");
});

app.use(function(req, res) {
	res.status(404);
	res.render("404");
});

app.use(function(req, res) {
	res.type("text/plain");
	res.send("500, baby");
});

app.listen(app.get("port"), function() {
	console.log("Port " + app.get("port"));
});