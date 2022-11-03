import { GET_COUNTRIES, GET_COUNTRY_BYID, CREATE_ACTIVITY } from "../Actions";

const initialState = {
  countries: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case GET_COUNTRY_BYID:
      return {};
    case CREATE_ACTIVITY:
      return {};
    default:
      return state;
  }
}

export default rootReducer;
