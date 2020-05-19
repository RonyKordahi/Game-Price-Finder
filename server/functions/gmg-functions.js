const { editSearchTerm, fetchData } = require("../helpers");

const getGMG = async (searched) => {
    const edittedSearchTerm = editSearchTerm(searched);

    let $ = await fetchData(`https://www.greenmangaming.com/games/${edittedSearchTerm}-pc`);

    // if the game is not found, checks an alternate url
    if (!$) {
        $ = await fetchData(`https://www.greenmangaming.com/games/${edittedSearchTerm}`);
    }

    // if the game is not found a second time, returns null
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
    if (parsedInfo[1].length || parsedInfo[4].length) {
        const current = parsedInfo[4];
        const full = parsedInfo[1];
        return {current: current, full: full, url: `https://www.greenmangaming.com/games/${edittedSearchTerm}-pc`};
    }
    else {
        return {current: null, full: null}
    }
}

module.exports = {
    getGMG,
}