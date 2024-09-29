var auth = require("./auth.js");
var express = require("express");

var app = express();

var handlebars = require("express-handlebars").create({defaultLayout:"main"});
app.engine("handlebars", handlebars.engine);

app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

app.use(require("body-parser")());
app.use(require("cookie-parser")(auth.secret));
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
	var nodemailer = require("nodemailer");

	var transport = nodemailer.createTransport({
		service: "Gmail",
		host: "smtp.gmail.com",
		secure: true,
		port: 465,
		auth: {
			user: auth.mail.user,
			pass: auth.mail.password
		}
	});

	const options = {
		from: "teochwthunder@gmail.com",
		to: req.body.txtEmail,
		subject: "A Christmas message from your friend has arrived!",
		text: req.body.txtMessage,
	};

	transport.sendMail(options, (error, info) => { 
		console.log(auth);
		if (error) {
			console.log(error)
			res.render("500", { errorMessage: error.code });
		} else {
			res.redirect(303, "/thankyou");
		}
	});
});

app.use(function(req, res, next) {
	res.status(404);
	res.render("404");
});

app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500);
	res.render("500", { errorMessage: err.code });
});

app.listen(app.get("port"), function() {
	console.log("Port " + app.get("port"));
});