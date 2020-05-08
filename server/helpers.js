const axios = require("axios");
const cheerio = require("cheerio");

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
}