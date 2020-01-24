const dev = {
    SEARCH_API: "https://dev-hotels-shopping-search.travelagency.tech",
    SUGGESTIONS_API: "https://dev-hotels-autocomplete.travelagency.tech"
};

const prod = {
    SEARCH_API: "https://dev-hotels-shopping-search.travelagency.tech",
    SUGGESTIONS_API: "https://hotels-suggestion.travelagency.tech"
};

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;

export default {
    ...config
};