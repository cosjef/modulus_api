var express = require('express');
// Invoke Express to return an Express instance as "app"
var app = express();
// Add BodyParser package to take POST and PUT requests
var bodyParser = require('body-parser');

var quotes = [
 { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
  { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  { author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
  { author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}

];



// Add a route by calling app.METHOD
// GET request
// Pass the route of the URL that will be accessed
// Second parameter to a route is a callback to the call when the URL is retrieved
app.get('/', function(req, res) {
	res.json(quotes);
});


app.get('/quote/random', function (req, res) {
	// calculate a random index on the items in the quotes array
	var id = Math.floor(Math.random() * quotes.length);
	var q = quotes[id];
	res.json(q);
})

app.get('/quote/:id', function (req, res) {
	if(quotes.length <= req.params.id || req.params.id < 0) {
		res.statusCode = 404;
		return res.send('Error 404: No quote found');
	}
	var q = quotes[req.params.id];
	res.json(q);
});

app.use(bodyParser());


app.post('/quote/:id' , function (req, res) {
	// check to see if body has both the "author" and "text" properties
	// if not return a 400 error
	if(!req.body.hasOwnProperty('author') ||  
	     !req.body.hasOwnProperty('text')) {

	res.statusCode = 400;
	return res.send('Error 400: Post syntax incorrect.');
}
	// add a new quote to the array
	var newQuote = {
		author : req.body.author,
		text : req.body.text
	};
	quotes.push(newQuote);
	res.json(true);
});


app.delete('/quote/:id', function(req, res) {
	// check the length of the quote to ensure we don't delete something that is not there
	if(quotes.length <= req.params.id) {
		res.statusCode = 404;
		return res.send('Error 404: No quote found');
	}
	// if quote is new, splice the array to remove the quote, and return true to the client
	quotes.splice(req.params.id, 1);
	res.json(true);
});


app.listen(process.env.PORT || 4730);

