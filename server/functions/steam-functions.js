const request = require("request-promise");

const { editSearchTerm, editPrice } = require("../helpers");

const getGameInfo = async (appId, searched) => {
    let info;

    try {
        await request(`https://store.steampowered.com/api/appdetails/?appids=${appId}`)
            .then(res => JSON.parse(res))
            .then( (data) => {
                searched = editSearchTerm(searched);

                // will be used to edit the price if found
                let edditedCurrent;
                let edditedFull;

                // this is relevant for the game's URL
                searched = searched.replace(/-/g, "_");

                if (data[appId].data.price_overview) {
                    const currentPrice = data[appId].data.price_overview.final / 100;
                    const fullPrice = data[appId].data.price_overview.initial / 100;

                    // edits the prices, turns them to strings to conserve the second digit if it is a 0 (ex: 10.90)
                    edditedCurrent = editPrice(currentPrice);
                    edditedFull = editPrice(fullPrice);

                    info = {current: edditedCurrent,
                        full: edditedFull, 
                        discount: data[appId].data.price_overview.discount_percent,
                        url: `https://store.steampowered.com/app/${appId}/${searched}/`} 
                }
                else if (data[appId].data.price_in_cents_with_discount){
                    // Free games on Steam do not have a price_overview object. This sets their price to 0 to avoid errors
                    info = {current: 0, full: 0, discount: 100, url: `https://store.steampowered.com/app/${appId}/${searched}/`}
                }
                else {
                    // Games that have been removed from steam do not have any price keys in the object
                    info = {current: null, full: null, discount: null};
                }
            })
    }
    catch {
        console.log("Game not found");
        // returns null if the game is not found
        info = {current: null, full: null, discount: null};
    }
    return info;
}

const getSteamCatalog = async () => {
    try {
        // will be returned by the function
        let returnApps;
        
        // endpoint that returns the entire steam catalogue
        await request("https://api.steampowered.com/ISteamApps/GetAppList/v2/?")
            .then(res => JSON.parse(res))
            .then(data => {
                const {applist} = data;
                const {apps} = applist;
                returnApps = apps;
            })
            return returnApps;
        }
        catch {
            console.log("Error getting catalog");
        }
}

const getSteam = async (searched, catalog) => {
    // filtering for the exact game based on it's name and length
    let searchedGame = catalog.filter(app => {
        // certain games in the steam catalogue keep the trademark special character in their names, this erases it
        app.name = app.name.replace("™ ", "");
        app.name = app.name.replace("™", "");
        app.name = app.name.replace("®", "");
        app.name = app.name.replace("® ", "");
        
        // where the magic happens
        if (app.name.toLowerCase().includes(searched.toLowerCase()) && app.name.length === searched.length) {
            return app;
        }
    })

    // if the game is not found, returns null
    if (!searchedGame.length) {
        return {current: null, full: null, discount: null}
    }
    else {
        const appId = searchedGame[0].appid.toString();

        // fetches on the second API to receive the game's details
        const gameInfo = await getGameInfo(appId, searched);
        
        return gameInfo;
    }
}

module.exports = {
    getSteam,
    getSteamCatalog,
}