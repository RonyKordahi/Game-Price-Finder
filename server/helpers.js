const axios = require("axios");
const cheerio = require("cheerio");

// ******************************
// edits the user's searched term
// ******************************
const editSearchTerm = searched => {
    searched = searched.replace(/:/g, "");
    searched = searched.replace(/-/g, "");
    searched = searched.replace(/'/g, "");
    searched = searched.replace(/\./g, "");
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
}