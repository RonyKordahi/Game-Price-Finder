const { editSearchTerm, fetchData } = require("../helpers");

const getGMG = async (searched) => {
    const edittedSearchTerm = editSearchTerm(searched);

    const $ = await fetchData(`https://www.greenmangaming.com/games/${edittedSearchTerm}-pc`);

    // if the game is not found, returns null
    if (!$) {
        return {current: null, full: null}
    }

    const priceInfo = JSON.stringify($(".current-price, .prev-price").text());
    // this block of inelegant code cleans up the returned parse
    let parsedInfo = JSON.parse(priceInfo);
    parsedInfo = parsedInfo.split("\n");
    parsedInfo = parsedInfo.join(" ");
    parsedInfo = parsedInfo.replace(/\$/g, "");
    parsedInfo = parsedInfo.split(" ");
    
    // grabbing the full and discounted prices and converts them into a number
    const full = parsedInfo[1];
    const current = parsedInfo[4];
    
    return {current: current, full: full, url: `https://www.greenmangaming.com/games/${edittedSearchTerm}-pc`};
}

module.exports = {
    getGMG,
}