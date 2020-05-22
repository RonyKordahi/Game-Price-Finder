const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request-promise");

// *********************************************************
// filters through the app API to eliminate needless results
// *********************************************************
const steamFilter = async (gameList, searched) => {
    let keptGames = [];
    let exactGame = [];

    const fetchTest = async game => {
        await request(`https://store.steampowered.com/api/appdetails/?appids=${game.appid}`)
            .then(res => JSON.parse(res))
            .then(data => {
                if (data[game.appid].success === true && data[game.appid].data.type === "game"){
                    if (game.name.toLowerCase() === searched.toLowerCase()) {
                        exactGame.push(game.name);
                    }
                    else {
                        keptGames.push(game.name);
                    }
                }
            })
            return Promise.resolve("ok");
    }

    const asyncFunc = async game => {
        return await fetchTest(game);
    }

    const test1 = async () => {
        return Promise.all(gameList.map(game => asyncFunc(game)))
    }

    return test1().then(data => {
        if (exactGame.length) {
            return exactGame;
        }
        else {
            keptGames.sort();
            return keptGames;
        }
    })
}

// ****************************************************************************************
// Filters through all the games in order to remove as many unnecessary results as possible
// ****************************************************************************************
const superFilter = (catalog, searched) => {
    
    const filteredCatalog = catalog.filter(app => {
        // certain games in the steam catalogue keep the trademark special character in their names, this erases it
        app.name = app.name.replace("™ ", "");
        app.name = app.name.replace("™", "");
        app.name = app.name.replace("®", "");
        app.name = app.name.replace("® ", "");
        
        if (app.name.toLowerCase().includes(searched.toLowerCase())) {
            return app
        }
    })

    return filteredCatalog;
}

// **************************************************************************************
// edits the pricing, transforms it into string to conserve the 0 after the decimal point
// **************************************************************************************
const editPrice = price => {
    let priceEdit = price.toString().split(".");

    if (priceEdit[1].length === 1) {
        priceEdit[1] += "0";
    }
    return(priceEdit.join("."))
}

// ******************************
// edits the user's searched term
// ******************************
const editSearchTerm = searched => {
    searched = searched.replace(/:/g, "");
    searched = searched.replace(/-/g, "");
    searched = searched.replace(/'/g, "");
    searched = searched.replace(/\./g, "");
    searched = searched.replace(/!/g, "");
    searched = searched.replace(/\?/g, "");
    searched = searched.replace(/\s+/g, "-").toLowerCase();
    return searched;
}

// ***************************************
// fetches the HTML on the designated site
// ***************************************
const fetchData = async (url) => {
    try {
        const res = await axios.get(url);
        return cheerio.load(res.data);
    }
    catch {
        // if the game is not found
        return false;
    }
}

module.exports = {
    editSearchTerm,
    fetchData,
    editPrice,
    superFilter,
    steamFilter,
}