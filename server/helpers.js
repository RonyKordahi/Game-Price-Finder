const axios = require("axios");
const cheerio = require("cheerio");

// ****************************************************************************************
// Filters through all the games in order to remove as many unnecessary results as possible
// ****************************************************************************************
const superFilter = (catalog, searched) => {
    
    const catalogFilter = catalog.filter(app => {
        // certain games in the steam catalogue keep the trademark special character in their names, this erases it
        app.name = app.name.replace("™ ", "");
        app.name = app.name.replace("™", "");
        app.name = app.name.replace("®", "");
        app.name = app.name.replace("® ", "");
        
        if (app.name.toLowerCase().includes(searched.toLowerCase())
            // includes specific games
            && (!(app.name.toLowerCase().includes("pack")) || app.name.toLowerCase().includes("jackbox"))
            && (!(app.name.toLowerCase().includes("trailer")) || app.name.toLowerCase().includes("trailers"))
            && (!(app.name.toLowerCase().includes("tool")) || app.name.toLowerCase().includes("up"))
            && (!(app.name.toLowerCase().includes("contest")) || app.name.toLowerCase().includes("mahjong"))
            && (!(app.name.toLowerCase().includes("arkham asylum")) && (!(app.name.toLowerCase().includes("arkham city")))
            || app.name.toLowerCase().includes("goty"))
            && (!(app.name.toLowerCase().includes("shirt")) || app.name.toLowerCase().includes("redshirt"))
            // includes several games
            && (!(app.name.toLowerCase().includes("mod")) || app.name.toLowerCase().includes("garry") 
            || app.name.toLowerCase().includes("mode")) 
            // specific to a few games/results only
            && !(app.name.toLowerCase().includes("online supply drop")) && !(app.name.toLowerCase().includes("minecraft"))
            && !(app.name.toLowerCase().includes("community safe")) && !(app.name.toLowerCase().includes("batman arkham city:"))
            && !(app.name.toLowerCase().includes("mario")) && !(app.name.toLowerCase().includes("player profiles"))
            && !(app.name.toLowerCase().includes("cold, cold heart")) && !(app.name.toLowerCase().includes("steam powered"))
            && !(app.name.toLowerCase().includes("armor safe reward")) && !(app.name.toLowerCase().includes("dota 2 -"))
            && !(app.name.toLowerCase().includes("steam dev days")) && !(app.name.toLowerCase().includes("dota 2 test"))
            && !(app.name.toLowerCase().includes("dota 2 teaser")) && !(app.name.toLowerCase().includes("rescue bear operation -"))
            && !(app.name.toLowerCase().includes("cancerpants"))
            // everything else
            && !(app.name.toLowerCase().includes("dlc")) && !(app.name.toLowerCase().includes("season pass"))
            && !(app.name.toLowerCase().includes("beta")) && !(app.name.toLowerCase().includes("demo"))
            && !(app.name.toLowerCase().includes("server")) && !(app.name.toLowerCase().includes("soundtrack"))
            && !(app.name.toLowerCase().includes("bonus")) && !(app.name.toLowerCase().includes("sdk"))
            && !(app.name.toLowerCase().includes("expansion")) && !(app.name.toLowerCase().includes("bundle"))
            && !(app.name.toLowerCase().includes("update")) && !(app.name.toLowerCase().includes("content"))
            && !(app.name.toLowerCase().includes("development")) && !(app.name.toLowerCase().includes("configuration"))
            && !(app.name.toLowerCase().includes("upload")) && !(app.name.toLowerCase().includes("setup"))
            && !(app.name.toLowerCase().includes("template"))
            ) {
                return app;
        }
    })

    let filteredCatalog = [];

    // because the .filter method can only return the entire object, an extra step is required
    catalogFilter.forEach(app => {
        filteredCatalog.push(app.name);
    })
    
    // sorts the results alphabetically
    filteredCatalog.sort();

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
}