var express = require('express');
var app = express();
var axios = require('axios');
require('dotenv').config(); // Load environment variables

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Function to retrieve the Steam API key from the environment variables
function getSteamApiKey() {
   return process.env.STEAM_API_KEY;
}

// Serve static files from the public directory
app.use(express.static('views'));

// Here gets parameters from end of URL to use in the API address. These parameters will come from submit buttons 
// on the respective sites
app.get('/getplayersummary', function(req, res) {
  var qParams = [];
  for (var p in req.query) {
    qParams.push({'name':p, 'value':req.query[p]})
  }
  var url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + getSteamApiKey() + '&steamids=76561198054586238' + qParams[0].name;
  axios.get(url)
    .then(function(response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

// More to add here routes etc...

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

