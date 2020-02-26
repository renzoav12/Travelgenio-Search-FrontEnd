const dev = {
    SEARCH_API: "https://dev-hotels-shopping-search.travelagency.tech",
    SUGGESTIONS_API: "https://dev-hotels-autocomplete-suggestion.travelagency.tech",
    EMAIL_SUBSCRIPTION_API: "http://v24-hermes.int.travelgenio.tech"
};

const prod = {
    SEARCH_API: "https://hotels-shopping-search.travelagency.tech",
    SUGGESTIONS_API: "https://hotels-autocomplete-suggestion.travelagency.tech",
    EMAIL_SUBSCRIPTION_API: "http://v24-hermes.int.travelgenio.tech"
};

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;

export default {
    ...config
};