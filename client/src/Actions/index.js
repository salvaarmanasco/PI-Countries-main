import axios from "axios";

export const CLEAN_DETAILS = "CLEAN_DETAILS";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_ID = "GET_COUNTRIES_BY_ID";
export const FILTER_BY_REGION = "FILTER_BY_REGION";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const FILTER_ACTIVITIES = "FILTER_ACTIVITIES";
export const POST_ACTIVITY = "POST_ACTIVITY";

export const getCountries = () => async (dispatch) => {
  const response = await axios.get("/countries", {});
  return dispatch({ type: GET_COUNTRIES, payload: response.data });
};

export function getCountryDetails(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/countries/${id}`);
      return dispatch({
        type: GET_COUNTRIES_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const cleanDetails = () => {
  return {
    type: CLEAN_DETAILS,
    payload: [],
  };
};

export const filterCountriesByRegion = (payload) => {
  return {
    type: FILTER_BY_REGION,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByPopulation = (payload) => {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
};

//------------------------------------------ACTIVITIES---------------------------------------------------------//

export const getActivities = () => async (dispatch) => {
  const response = await axios.get("/activities", {});
  return dispatch({ type: GET_ACTIVITIES, payload: response.data });
};

export const filterActivities = (payload) => {
  return {
    type: FILTER_ACTIVITIES,
    payload,
  };
};

export const postActivities = (payload) => async (dispatch) => {
  const response = await axios.post("/activities", payload);
  return {
    type: "POST_ACTIVITY",
    response,
  };
};
