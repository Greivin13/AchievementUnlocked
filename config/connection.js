const Sequelize = require("sequelize");

require("dotenv").config();

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: "mysql://b05db9d19de748:4be79ac5@us-cdbr-east-06.cleardb.net/heroku_fe1f270e4a64d16?reconnect=true",
      dialect: "mysql",
      port: 3306,
    });

module.exports = sequelize;
