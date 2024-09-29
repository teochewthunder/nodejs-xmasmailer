var express = require("express");

var app = express();

var handlebars = require("express-handlebars").create({defaultLayout:"main"});
app.engine("handlebars", handlebars.engine);

app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

app.use(require("body-parser")());
app.use(require("cookie-parser")("thisisasecret"));
app.use(require("express-session")());
app.use(require("csurf")());


app.get("/", function(req, res) {
	res.render("form", { csrf: req.csrfToken() });
});

app.get("/thankyou", function(req, res) {
	res.render("thankyou");
});

app.post("/process", function(req, res) {
	console.log(req.body);

	//email

	//handle email error

	res.redirect(303, "/thankyou");
});

app.use(function(req, res, next) {
	res.status(404);
	res.render("404");
});

app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500);
	res.render("500");
});

app.listen(app.get("port"), function() {
	console.log("Port " + app.get("port"));
});