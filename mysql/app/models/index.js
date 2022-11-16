
require('dotenv').config()

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    process.env.DB,
    process.env.USER,
    process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.notes = require("./notes.model.js")(sequelize, Sequelize);
module.exports = db;