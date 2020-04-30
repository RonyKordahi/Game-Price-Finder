const request = require("request-promise");

const { editSearchTerm } = require("../helpers");

const secondFetch = async (appId, searched) => {
    let info;

    try {
        await request(`https://store.steampowered.com/api/appdetails/?appids=${appId}`)
            .then(res => JSON.parse(res))
            .then( (data) => {
                searched = editSearchTerm(searched);
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
        console.log("broke 2")
        firstFetch(searched)
    }
    return info;
}

const firstFetch = async (searched) => {
    try {
        // will be returned by the function
        let returnGame;

        // endpoint that returns the entire steam catalogue
        await request("https://api.steampowered.com/ISteamApps/GetAppList/v2/?")
            .then(res => JSON.parse(res))
            .then(data => {
                const {applist} = data;
                const {apps} = applist;
                return apps;
            })
            .then(apps => {
                if (!apps) {
                    firstFetch(searched);
                }
                apps.filter(app => {
                    // filtering for the exact game based on it's name and string length
                    if (app.name.toLowerCase().includes(searched.toLowerCase()) && app.name.length === searched.length) {
                        returnGame = app;
                    }
                })
            })
            
            return returnGame;
        }
        catch {
            // calls back the function because the endpoint will occasionally return an empty object 
            // if it has received too many third party pings (many other websites and apps use this endpoint)
        console.log("broke 1")
        firstFetch(searched);
        }
}

const getSteam = async (searched) => {
    // fetches on the first API to receive the entire list of games then filters through to find the specific one requested
    const stepOne = await firstFetch(searched);
    
    const appId = stepOne.appid.toString();

    // fetches on the second API to receive the game's details
    const stepTwo = await secondFetch(appId, searched);

    // if the game is not found, returns null
    if (!stepTwo) {
        return {current: null, full: null, discount: null}
    }

    return stepTwo;
}

module.exports = {
    getSteam,
}