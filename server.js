const express = require ('express');
const handle  = require ('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
// add partials feature
handle.registerPartials(__dirname + '/views/partials');
// set hbs into Express
app.set('view engine','hbs');


app.use( (req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

app.use( (req,res,next) => {
  res.render('maint.hbs');
});

app.use(express.static(__dirname + '/public'));


// helper method to return year
handle.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});


// helper method to return year
handle.registerHelper('screamIt', (textToScream) => {
  return textToScream.toUpperCase()
});


app.get('/', (request, response)=> {
//  response.send('<h1> Hello from Express </h1>');
  response.render('home.hbs', {
    pageTitle : 'Home Page',
    name : 'Jay'
  });
});

app.get('/about', (req, resp)=>{
  resp.render('about.hbs', {
    pageTitle : 'About Page'
  });
});


app.get('/bad', (req, resp)=>{
  resp.send({
    error: 45,
    description: 'unknown error'
  });
});


app.listen(port , () =>{
  console.log(`server up and running on port ${port}`);
});
