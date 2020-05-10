const { getSteam } = require("./steam-functions");
const { getHumble } = require("./humble-functions");
const { getGMG } = require("./gmg-functions");
const { getGOG } = require("./gog-functions");

const { checkFavorites } = require("./favorites-functions");

const getGame = async req => {
    const { searched, steam, humble, gmg, gog, _id} = req.params;
    console.log("searching");
    // will be sent to the front end
    let returnValue;
    
    let results = [];
    let favorites;

    if (steam === "true") {
        const steamResults = await getSteam(searched);
        steamResults.name = "Steam";
        results.push(steamResults);
    }

    if (humble === "true") {
        const humbleResults = await getHumble(searched);
        humbleResults.name = "Humble";
        results.push(humbleResults);
    }

    if (gmg === "true") {
        const gmgResults = await getGMG(searched);
        gmgResults.name = "GMG";
        results.push(gmgResults);
    }

    if (gog === "true") {
        const gogResults = await getGOG(searched);
        gogResults.name = "GOG";
        results.push(gogResults);
    }

    // default return value to no favorite found
    returnValue = {results: results, isFavorite: false}

    if(_id !== "undefined") {
        favorites = await checkFavorites(_id);
        if (favorites && favorites.length) {
            await favorites.forEach(favorite => {
                if (favorite.userInput.toLowerCase() === searched.toLowerCase() && favorite.steam === steam && favorite.humble === humble
                    && favorite.gmg === gmg && favorite.gog === gog) {
                        // sets return value to favorite being found
                        returnValue = {results: results, isFavorite: true}
                    }
            })   
        }
    }
    
    return returnValue;
}

module.exports = {
    getGame,
}