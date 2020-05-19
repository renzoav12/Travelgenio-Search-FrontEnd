const dev = {
  SEARCH_API: "https://dev-hotels-shopping-search.travelagency.tech",
  AUTOCOMPLETE:"https://es.travelgenio.com/hotels/api",
  TRANSLATION_API: "https://dev-hotels-translation.travelagency.tech",
  GOOGLE_MAP_KEY: "AIzaSyAnwYNB5CVKjwPORNGDi67XLfcfE0WV-to"
};

const prod = {
  SEARCH_API: "https://" + window.location.hostname + "/hotels/api/",
  AUTOCOMPLETE: "https://" + window.location.hostname + "/hotels/api/",
  TRANSLATION_API: "https://" + window.location.hostname + "/hotels/api/",
  GOOGLE_MAP_KEY: "AIzaSyBNbxebn0wds-Anmg_bPsym7YZcVJqPIK0"
};

const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  ...config,
};
