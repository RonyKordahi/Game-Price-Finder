const { editSearchTerm, fetchData } = require("../helpers");

const getGMG = async (searched) => {
    const edittedSearchTerm = editSearchTerm(searched);
    let firstURL = `https://www.greenmangaming.com/games/${edittedSearchTerm}-pc`
    let secondURL = `https://www.greenmangaming.com/games/${edittedSearchTerm}`
    let secondCheck = false;

    let $ = await fetchData(firstURL);

    // if the game is not found, checks an alternate url
    if (!$) {
        secondCheck = true
        $ = await fetchData(secondURL);
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
        const current = parsedInfo[3];
        const full = parsedInfo[1];
        if (secondCheck) {
            return {current: current, full: full, url: secondURL};
        }
        else {
            return {current: current, full: full, url: firstURL};
        }
    }
    else {
        return {current: null, full: null}
    }
}

module.exports = {
    getGMG,
}