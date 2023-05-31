const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
