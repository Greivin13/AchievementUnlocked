const path = require("path");
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const sequelize = require("./config/connection.js");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const axios = require("axios");

const SteamAPI = require('steamapi');
require('dotenv').config();

const steam = new SteamAPI(process.env.API_KEY);


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
}); // <-- Add closing brace here

app.get("/", async (request, response) => {
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
// steam.resolve('http://steamcommunity.com/profiles/76561197962122587').then(id => {
//   console.log(id); // 76561198146931523
// });

// steam.resolve('http://steamcommunity.com/profiles/76561198947331366').then(id => {
//   console.log(id); // 76561198146931523
// });


steam.getUserSummary('76561199036046793').then(summary => {
  console.log(summary); // 76561198146931523
})

// steam.getUserSummary('76561197962122587').then(summary => {
//   console.log(summary); // 76561198146931523

// steam.getUserSummary('76561198947331366').then(summary => {
  // console.log(summary); // 76561198146931523
// app.get("/steamData", async (request, response) => {
  //   const requestParam = request.params.steamID;
  //   // const playerDataRequest = requestParam;
  //   const queryUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.steamkey}&steamids=${process.env.rinSteam64ID}`;
  //   const fetch_response = await fetch(queryUrl);
  //   const playerData = await fetch_response.json();
  //   response.json(playerData);
  //   // console.log(res.json(playerData));
  //   // response.render("profile", { playerData: playerData });
  // });
