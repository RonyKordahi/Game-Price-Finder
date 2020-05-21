const { getSteam, getSteamCatalog } = require("./steam-functions");
const { getHumble } = require("./humble-functions");
const { getGMG } = require("./gmg-functions");
const { getGOG } = require("./gog-functions");
const { superFilter } = require("../helpers");
const { checkFavorites } = require("./favorites-functions");

const getGame = async req => {
    let { searched, steam, humble, gmg, gog, _id} = req.params;
    
    // will be sent to the front end
    let returnValue;
    
    // used in the back end
    let catalog;
    let results = [];
    let favorites;

    // calls back the function because the API will occasionally return an empty object 
    // if it has received too many third party pings (many other websites and apps use this API)
    do {
        catalog = await getSteamCatalog();
    }
    while(!catalog.length)
    
    // filters through the list of games to remove "pollution" as much as possible
    let searchedTerm = superFilter(catalog, searched);

    if (searchedTerm.length === 1 && searchedTerm[0].toLowerCase() === searched.toLowerCase() || searchedTerm.length === 0) {
        if (steam === "true") {
            const steamResults = await getSteam(searched, catalog);
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
    }
    else {
        returnValue = {links: searchedTerm};
    }
    
    return returnValue;
}

module.exports = {
    getGame,
}