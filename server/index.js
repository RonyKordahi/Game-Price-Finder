'use strict';

let results;

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const schedule = require("node-schedule");

// Function calls
// *********************************************************
const { getGame } = require("./functions/search-functions");

const { addFavorite, 
    removeFavorite, 
    getFavorites, } = require("./functions/favorites-functions");
    
const { getSteamCatalog } = require("./functions/steam-functions");
// *********************************************************

const PORT = process.env.PORT || 4000;

// every monday at 12
schedule.scheduleJob({hour: 12, minute: 0, dayOfWeek: 6}, function() {
    console.log("THIS IS A NEW SCHEDULED TEST");
})

express()
    .use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Methods',
            'OPTIONS, HEAD, GET, PUT, POST, DELETE'
        );
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
    })
    // present by default
    .use(morgan('dev'))
    .use(express.static('./server/assets'))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))
    .use('/', express.static(__dirname + '/'))

    // endpoints
    .get("/search/:searched/:steam/:humble/:gmg/:gog/:_id", async (req, res) => res.send(results = await getGame(req)))
    .post("/add/favorite", (req, res) => res.send(addFavorite(req)))
    .post("/remove/favorite", (req, res) => res.send(removeFavorite(req)))
    .get("/get/:_id", async (req, res) => res.send(results = await getFavorites(req)))

    .listen(PORT, () => console.info(`Listening on port ${PORT}`));
