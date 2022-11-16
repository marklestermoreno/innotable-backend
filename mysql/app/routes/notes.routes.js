
require('dotenv').config()

module.exports = app => {
    const notes = require("../controller/notes.controller");
    var router = require("express").Router();

    router.post("/", notes.create);
    router.get("/", notes.findAll);
    router.get("/password-protected", notes.findAllPasswordProtected);
    router.get("/:id", notes.findOne);
    router.put("/:id", notes.update);
    router.delete("/:id", notes.delete);
    app.use(process.env.restLink, router)
}