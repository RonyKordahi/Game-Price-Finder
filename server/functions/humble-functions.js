const { editSearchTerm, fetchData } = require("../helpers");

const getHumble = async (searched) => {
    const array = searched.split(" ")
    
    // exclusively used to verify if user searches for "Sid Meier's Civlization VI"
    // humble store url uses 6 instead of VI only for the full game, all the DLC use VI in the url
    if (array.length > 2) {
        if (array[array.length - 2].toLowerCase() === "civilization") {
            if (array[array.length - 1].toLowerCase() === "vi") {
                array[array.length - 1] = "6";
                searched = array.join(" ");
            }
        }
    }
    
    const edittedSearchTerm = editSearchTerm(searched);

    const $ = await fetchData(`https://www.humblebundle.com/store/${edittedSearchTerm}`);

    // if the game is not found, returns null
    if (!$) {
        return {current: null, full: null}
    }

    // id does not appear in the site's HTML, had to parse the entire body and save it to a file to find this id
    const priceInfo = JSON.parse($("#storefront-webpack-json-data").html());

    // information is stored in products_json[0] verified through file-save
    return {current: priceInfo.products_json[0].current_price.amount, 
            full: priceInfo.products_json[0].full_price.amount, 
            url: `https://www.humblebundle.com/store/${edittedSearchTerm}`};
}

module.exports = {
    getHumble,
};