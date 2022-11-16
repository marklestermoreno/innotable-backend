

require('dotenv').config()

const express = require('express');
const cors = require('cors');
const app = express();

var corsOption = {
    origin: process.env.corsOption
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models")

db.sequelize.sync()
    .then(() => {
        console.log("Synced DB");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message)
    })

app.get("/", (req, res) => {
    res.json({ message: "ML" })
});

require("./app/routes/notes.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})