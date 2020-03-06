const dev = {
    SEARCH_API: "https://dev-hotels-shopping-search.travelagency.tech",
    SUGGESTIONS_API: "https://dev-hotels-autocomplete-suggestion.travelagency.tech"
};

const prod = {
    SEARCH_API: "https://" + window.location.hostname + "/hotels/api/",
    SUGGESTIONS_API: "https://" + window.location.hostname + "/hotels/api/"
};

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;

export default {
    ...config
};