const request = require("request-promise");

const { editSearchTerm } = require("../helpers");

const secondFetch = async (appId, searched) => {
    let info;

    try {
        await request(`https://store.steampowered.com/api/appdetails/?appids=${appId}`)
            .then(res => JSON.parse(res))
            .then( (data) => {
                searched = editSearchTerm(searched);

                // this is relevant for the game's URL
                searched = searched.replace(/-/g, "_");

                data[appId].data.price_overview ? 
                    info = {current: data[appId].data.price_overview.final / 100,
                        full: data[appId].data.price_overview.initial / 100, 
                        discount: data[appId].data.price_overview.discount_percent,
                        url: `https://store.steampowered.com/app/${appId}/${searched}/`} : 
                    // Free games on Steam do not have a price_overview object. This sets their price to 0 to avoid errors
                    info = {current: 0, full: 0, discount: 100, url: `https://store.steampowered.com/app/${appId}/${searched}/`}
            })
    }
    catch {
        console.log("Error in secondFetch");
    }
    return info;
}

const firstFetch = async (searched) => {
    try {
        // will be returned by the function
        let returnApps;

        // endpoint that returns the entire steam catalogue
        await request("https://api.steampowered.com/ISteamApps/GetAppList/v2")
            .then(res => JSON.parse(res))
            .then(data => {
                const {applist} = data;
                const {apps} = applist;
                returnApps = apps;
            })
            return returnApps;
        }
        catch {
            console.log("Error in firstFetch");
        }
}

const getSteam = async (searched) => {
    // fetches on the first API to receive the entire list of games then filters through to find the specific one requested
    let stepOne;
    
    // calls back the function because the API will occasionally return an empty object 
    // if it has received too many third party pings (many other websites and apps use this API)    
    do {
        stepOne = await firstFetch(searched);

        // ***********************************
        // TEST WITH :  ™
        // ***********************************
    }
    while (!stepOne.length)
    
    const searchedGame = stepOne.filter(app => {
        // filtering for the exact game based on it's name and string length
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
        const stepTwo = await secondFetch(appId, searched);

        return stepTwo;
    }
}

module.exports = {
    getSteam,
}