const dev = {
  SEARCH_API: "https://dev-hotels-shopping-search.travelagency.tech",
  SUGGESTIONS_API:
    "https://dev-hotels-autocomplete-suggestion.travelagency.tech",
  I18N_API: "https://dev-hotels-translation.travelagency.tech",
};

const prod = {
  SEARCH_API: "https://" + window.location.hostname + "/hotels/api/",
  SUGGESTIONS_API: "https://" + window.location.hostname + "/hotels/api/",
  I18N_API: "https://hotels-translation.travelagency.tech/",
};

const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  ...config,
};
