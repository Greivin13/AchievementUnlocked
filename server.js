const path = require("path");
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const sequelize = require("./config/connection.js");
const exphbs = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 3000;


app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(routes);

// FIXME: CHANGE TO FALSE LATER
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
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

app.listen(app.get('PORT'), function(){
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});

