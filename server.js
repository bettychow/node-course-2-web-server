const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


// process.env is an object that stores all our environment variables in key value pairs
// process.env.PORT is for Heroku. If run app locally, use port 3000 instead
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials'); //allow you to reuse html
app.set('view engine', 'hbs') //set various express configurations

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log.')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public')); //a way to serve up the html page

// when referring to 'getCurrentYear', will generate the current year using the callback funciton
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express</h1>'); // another way to serve html. Not good.
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website!'
  });
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  //render allows you to render any template you have set up with your current view engine
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'My Porfolio'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
