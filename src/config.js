const dev = {
  //SEARCH_API: "https://dev-hotels-shopping-search.travelagency.tech",
  SEARCH_API: "http://localhost:8080",
  AUTOCOMPLETE:"https://dev-hotels-autocomplete-suggestion.travelagency.tech/suggestions",
  TRANSLATION_API: "https://dev-hotels-translation.travelagency.tech",
  GOOGLE_MAP_KEY: "AIzaSyAnwYNB5CVKjwPORNGDi67XLfcfE0WV-to",
  COBRAND: "https://dev-hotels-translation.travelagency.tech/config",
  EMAIL_SUBSCRIPTION: "http://v24-hermes.int.travelgenio.tech"
};

const prod = {
  SEARCH_API: "https://" + window.location.hostname + "/hotels/api/",
  AUTOCOMPLETE: "https://" + window.location.hostname + "/hotels/api/autocomplete",
  TRANSLATION_API: "https://" + window.location.hostname + "/hotels/api/",
  GOOGLE_MAP_KEY: "AIzaSyBNbxebn0wds-Anmg_bPsym7YZcVJqPIK0",
  COBRAND: "https://" + window.location.hostname + "/hotels/api/translations/config",
  EMAIL_SUBSCRIPTION: "http://v24-hermes.int.travelgenio.tech"
};

const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  ...config,
};
