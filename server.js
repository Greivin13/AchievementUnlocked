const path = require("path");
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const sequelize = require("./config/connection.js");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

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
  app.listen(PORT, () =>
    console.log(`Now listening\nhttp://localhost:${PORT}`)
  );
});

app.get("/steamData", async (request, response) => {
  const requestParam = request.params.steamID;
  // const playerDataRequest = requestParam;
  const queryUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.steamkey}&steamids=${process.env.rinSteam64ID}`;
  const fetch_response = await fetch(queryUrl);
  const playerData = await fetch_response.json();
  response.json(playerData);
  // console.log(res.json(playerData));
  // response.render("profile", { playerData: playerData });
});
