const seedUser = require("./User-seeds");
const seedReview = require("./Review-seeds");
const seedPost = require("./Post-seeds");
const seedUser = require("./User-seeds");
const seedReview = require("./Review-seeds");
const seedPost = require("./Post-seeds");
const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await seedUser();
  console.log("\n----- Users Seeded -----\n");

  await seedReview();
  console.log("\n----- Review Seeded -----\n");

  await seedPost();
  console.log("\n----- Post Seeded -----\n");

  process.exit(0);
};

seedAll();
