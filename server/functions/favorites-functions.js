const { MongoClient } = require('mongodb');

// ********************************************
// returns the user's favorites to the frontend
// ********************************************
const getFavorites = async req => {
    const {_id} = req.params;
    
    const client = new MongoClient("mongodb://localhost:27017", {
            useUnifiedTopology: true,
        });
    await client.connect();
    
    const db = client.db("final_project");

    const r = await db.collection("favorites").findOne({_id});

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
console.log("USER SEARCHED" , searched);
    const client = new MongoClient("mongodb://localhost:27017", {
            useUnifiedTopology: true,
        });
    await client.connect();
    
    const db = client.db("final_project");

    const r = await db.collection("favorites").findOne({_id});

    if (r) {
        let deleteIndex;
        r.favorites.forEach((favorite, index) => {
            if (favorite == searched) {
                console.log("USER FAV", favorite)
                deleteIndex = index;
            }
        })
        if (deleteIndex >= 0) {
            r.favorites.splice(deleteIndex, 1);
        }
        await db.collection("favorites").updateOne({_id}, {$set: {favorites: r.favorites}});
    }

    await client.close();
}

// *********************************
// adds a user's favorites to the DB
// *********************************
const addFavorite = async req => {

    const { _id, searched } = req.body;

    const client = new MongoClient("mongodb://localhost:27017", {
            useUnifiedTopology: true,
        });
    await client.connect();

    const db = client.db("final_project");

    const r = await db.collection("favorites").findOne({_id});

    if (r) {
        r.favorites.push(searched)
        await db.collection("favorites").updateOne({_id}, {$set: {favorites: r.favorites}});
    }
    else {
        await db.collection("favorites").insertOne({_id, favorites: [searched]});
    }

    await client.close();
}

module.exports = {
    addFavorite,
    removeFavorite,
    getFavorites,
}