const { editSearchTerm, fetchData } = require("../helpers");

const getGOG = async (searched) => {
    let edittedSearchTerm = editSearchTerm(searched);
    
    // GOG requires an extra string edditing step that the other sites do not
    edittedSearchTerm = edittedSearchTerm.replace(/-/g, "_");

    const $ = await fetchData(`https://www.gog.com/game/${edittedSearchTerm}`);

    let full = JSON.stringify($(".product-actions-price__base-amount").html());
    let current = JSON.stringify($(".product-actions-price__final-amount").html());

    // GOG returns the value between " which needs to be removed before converted to a number
    current = parseFloat(current.replace(/"/g, ""));
    full = parseFloat(full.replace(/"/g, ""));

    // GOG doesn't return an empty result from the fetchData function. It reequires it's own verification
    if (isNaN(current) || isNaN(full)) {
        return {current: null, full: null};
    }
    
    return {current: current, full: full, url: `https://www.gog.com/game/${edittedSearchTerm}`};
}

module.exports = {
    getGOG,
}