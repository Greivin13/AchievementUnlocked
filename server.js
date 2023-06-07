const path = require("path");

const SteamAPI = require('steamapi');
require('dotenv').config();

const steam = new SteamAPI(process.env.API_KEY);
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const sequelize = require("./config/connection.js");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const axios = require("axios");


const PORT = process.env.PORT || 3001;
const app = express();


// session setup
const sess = {
  secret: "Super secret secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const helpers = require("./utils/helpers");

const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "handlebars");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "/public/assets")));

// Routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening\nhttp://localhost:${PORT}`)
  );
}); 


app.get('/steamMembers', async (req, res) => {
  const steamID = '76561199036046793'; // Replace with the desired Steam ID
  const steamID1 = '76561198054586238';
  const steamID2 = '76561198947331366';
  const steamID3 = '76561198289182228';
  const steamID4 = '76561199227392699';

  try {
    const queryUrl1 = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.API_KEY}&steamids=${steamID}`;
    const queryUrl2 = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.API_KEY}&steamids=${steamID1}`;
    const queryUrl3 = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.API_KEY}&steamids=${steamID2}`;
    const queryUrl4 = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.API_KEY}&steamids=${steamID3}`;
    const queryUrl5 = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.API_KEY}&steamids=${steamID4}`;
    const apiResponse1 = await axios.get(queryUrl1);
    const apiResponse2 = await axios.get(queryUrl2);
    const apiResponse3 = await axios.get(queryUrl3);
    const apiResponse4 = await axios.get(queryUrl4);
    const apiResponse5 = await axios.get(queryUrl5);
    const playerData1 = apiResponse1.data.response.players[0];
    const playerData2 = apiResponse2.data.response.players[0];
    const playerData3 = apiResponse3.data.response.players[0];
    const playerData4 = apiResponse4.data.response.players[0];
    const playerData5 = apiResponse5.data.response.players[0];

    // Create an array and push the playerData objects
    const memberSummaries = [];
    memberSummaries.push(playerData1, playerData2, playerData3, playerData4, playerData5);

    // Render the "steamMembers" view with the memberSummaries data
    res.render('steamMembers', { memberSummaries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.get("/steamData", async (request, response) => {
  const steamID = '76561199036046793'; // Replace with the desired Steam ID

  try {
    const queryUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.API_KEY}&steamids=${steamID}`;
    const apiResponse = await axios.get(queryUrl);
    const playerData = apiResponse.data.response.players[0];

    response.render("profile", { playerData });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'An error occurred' });
  }
});


steam.resolve('https://steamcommunity.com/profiles/76561199036046793/').then(id => {
  console.log(id); // 76561198146931523
});

steam.getUserSummary('76561199036046793').then(summary => {
  console.log(summary); // 76561198146931523
})