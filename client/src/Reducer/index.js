import {
  GET_COUNTRIES,
  FILTER_BY_REGION,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  GET_ACTIVITIES,
  FILTER_ACTIVITIES,
  POST_ACTIVITY,
  GET_COUNTRIES_BY_ID,
  CLEAN_DETAILS,
} from "../Actions";

const initialState = {
  countries: [],
  alwaysAllCountries: [],
  activities: [],
  details: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        alwaysAllCountries: action.payload,
      };
    case GET_COUNTRIES_BY_ID:
      return {
        ...state,
        details: action.payload,
      };

    case CLEAN_DETAILS:
      return {
        ...state,
        details: action.payload,
        alwaysAllCountries: action.payload,
        countries: action.payload,
        activities: action.payload,
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
    //------------------------------------------ACTIVITIES-----------------------------------------------------//
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case FILTER_ACTIVITIES:
      const allCountriesFBA = state.alwaysAllCountries;
      const filteredCountriesBA =
        action.payload !== "All"
          ? allCountriesFBA.filter((c) =>
              c.Activities.map((a) => a.name).includes(action.payload)
            )
          : allCountriesFBA;
      return {
        ...state,
        countries: filteredCountriesBA,
      };
    case POST_ACTIVITY:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default rootReducer;
