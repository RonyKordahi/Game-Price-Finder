const { getSteam, getSteamCatalog } = require("./steam-functions");
const { getHumble } = require("./humble-functions");
const { getGMG } = require("./gmg-functions");
const { getGOG } = require("./gog-functions");
const { checkFavorites } = require("./favorites-functions");
const { superFilter, steamFilter } = require("../helpers");

const getGame = async req => {
    let { searched, steam, humble, gmg, gog, _id} = req.params;
    
    // will be sent to the front end
    let returnValue;
    
    // used in the back end
    let catalog;
    let results = [];
    let favorites;

    // calls back the function because the catalog API will occasionally return an empty object 
    // if it has received too many pings (many other websites and apps use this API)
    do {
        catalog = await getSteamCatalog();
    }
    while(!catalog.length)
    
    // filters through the list of games to remove "pollution" as much as possible
    const searchedTerm = superFilter(catalog, searched);

    // filters through the steam app API to return games only
    const filteredResults = await steamFilter(searchedTerm, searched);
    
    if (filteredResults.length === 1 && filteredResults[0].toLowerCase() === searched.toLowerCase() || filteredResults.length === 0) {
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
        returnValue = {links: filteredResults};
    }
    
    return returnValue;
}

module.exports = {
    getGame,
}