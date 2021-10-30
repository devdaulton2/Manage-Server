const { Sequelize } = require("sequelize");

const db = new Sequelize("manage", "postgres", process.env.PASS, {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;