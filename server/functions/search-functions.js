const { getSteam } = require("./steam-functions");
const { getHumble } = require("./humble-functions");
const { getGMG } = require("./gmg-functions");
const { getGOG } = require("./gog-functions");

const getGame = async req => {
    const { searched, steam, humble, gmg, gog} = req.params;
    
    // will be sent to the frontend
    let results = [];

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

    return {results};
}

module.exports = {
    getGame,
}