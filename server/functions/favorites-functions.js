const MongoClient = require('mongodb').MongoClient;
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.uri;

// ***************************************************************************************
// returns a list of the user's favorites to verify if a search has already been favorited
// ***************************************************************************************
const checkFavorites = async _id => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    
    const db = client.db("final_project");

    const r = await db.collection("favorites").findOne({_id});

    if (r) {
        client.close();
        return r.favorites
    }
}

// ********************************************
// returns the user's favorites to the front end
// ********************************************
const getFavorites = async req => {
    const {_id} = req.params;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    
    const db = client.db("final_project");
    const r = await db.collection("favorites").findOne({_id});

    // the front end handles the conditional rendering of the favorites array
    if (r) {
        client.close();
        return r.favorites
    }
}

// *************************************
// deletes a user's favorite from the DB
// *************************************
const removeFavorite = async req => {
    const { _id, searched } = req.body;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    
    const db = client.db("final_project");

    const r = await db.collection("favorites").findOne({_id});

    if (r) {
        r.favorites.forEach((favorite, index) => {

            // cannot compare a full object to another, had to break it down to all it's values
            if (favorite.userInput === searched.userInput && favorite.steam === searched.steam && favorite.humble === searched.humble
            && favorite.gmg === searched.gmg && favorite.gog === searched.gog) {

                // splices the favorites array based on the favorited game's index
                r.favorites.splice(index, 1);
            }
        })

        // updates the document in the collection
        await db.collection("favorites").updateOne({_id}, {$set: {favorites: r.favorites}});
    }

    await client.close();
    return "complete"
}

// *********************************
// adds a user's favorites to the DB
// *********************************
const addFavorite = async req => {

    const { _id, searched } = req.body;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db("final_project");

    const r = await db.collection("favorites").findOne({_id});

    // updates the user's favorites
    if (r) {
        let found = false;
        r.favorites.forEach(favorite => {
            if (favorite.userInput.toLowerCase() === searched.userInput.toLowerCase() && favorite.steam === searched.steam && favorite.humble === searched.humble
                && favorite.gmg === searched.gmg && favorite.gog === searched.gog) {
                    found = true;
                }
        })
        if (!found) {
            r.favorites.push(searched)
            await db.collection("favorites").updateOne({_id}, {$set: {favorites: r.favorites}});
        }
    }
    else {
        // if the user has not yet registered any favorites, the DB will create a document based on their ID
        await db.collection("favorites").insertOne({_id, favorites: [searched]});
    }

    await client.close();
    return "complete"
}

module.exports = {
    addFavorite,
    removeFavorite,
    getFavorites,
    checkFavorites,
}