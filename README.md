# nodejs-xmasmailer
This Node webservice accepts input in a form and uses it to send  HTML email.

## Modules
- `npm install --save express`
- `npm install --save express-handlebars`
- `npm install --save body-parser` (deprecated)
- `npm install --save express-session`
- `npm install --save cookie-parser`
- `npm install --save csurf`
- `npm install --save nodemailer`

## Routes
- `/`: Default. Displays the form.
- `process`: POST. This is run when form is submitted. Data from the form is used to generate a HTML email and send to the recepient.
- `thankyou`: This is run after form has been successfully processed.
- `500`: This is run when an error occurs.
- `404`: This is run when the requested route does not exist.

## Views
- `main.handlebars`: Parent layout for all other views. (except `emailtemplate`)
- `form.handlebars`: Form for gathering input.
- `thankyou.handlebars`: Shows thank you message with a link back to Form.
- `500.handlebars`: Displays error.
- `400.handlebars`: Displays 404.
- `emailtemplate.handlebars`: The layout used for creating HTML email.


