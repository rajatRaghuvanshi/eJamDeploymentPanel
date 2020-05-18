const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const parser = require('body-parser');

const deployment = require("./router/deployment");
const template = require("./router/template");

const app = express();
app.use(cors());
app.use(parser.json())

mongoose.connect(`mongodb+srv://demo-user:${process.env.dataBasePass}@e-jam-assignment-3us5x.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); });

app.use("/deployments", deployment)
app.use("/templates", template)

app.get("/test", (req, res) => {
    res.send("API working");
})

app.listen(process.env.PORT || 3001);