import {
  GET_COUNTRIES,
  FILTER_BY_REGION,
  FILTER_ACTIVITIES,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
} from "../Actions";

const initialState = {
  countries: [],
  alwaysAllCountries: [],
  activities: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        alwaysAllCountries: action.payload,
      };

    case FILTER_BY_REGION:
      const allCountriesFBR = state.alwaysAllCountries;
      const filteredCountries =
        action.payload == "All"
          ? allCountriesFBR
          : allCountriesFBR.filter((e) => e.region == action.payload);
      return {
        ...state,
        countries: filteredCountries,
      };
    case ORDER_BY_NAME:
      // const allCountriesOBN = state.alwaysAllCountries;
      const orderedCountriesBN =
        action.payload == "asc"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              } else if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : action.payload == "desc"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              } else if (b.name > a.name) {
                return 1;
              }
              return 0;
            })
          : state.countries;
      return {
        ...state,
        countries: orderedCountriesBN,
      };
    case ORDER_BY_POPULATION:
      // const allCountriesOBP = state.alwaysAllCountries;
      const orderedCountriesBP =
        action.payload == "stb"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              } else if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : action.payload == "bts"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              } else if (b.population > a.population) {
                return 1;
              }
              return 0;
            })
          : state.countries;
      return {
        ...state,
        countries: orderedCountriesBP,
      };
    case FILTER_ACTIVITIES:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default rootReducer;
