import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const FILTER_BY_REGION = "FILTER_BY_REGION";
export const FILTER_ACTIVITIES = "FILTER_ACTIVITIES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";

export const getCountries = () => async (dispatch) => {
  const response = await axios.get("http://localhost:3001/countries", {});
  return dispatch({ type: GET_COUNTRIES, payload: response.data });
};
export const filterCountriesByRegion = (payload) => {
  return {
    type: FILTER_BY_REGION,
    payload,
  };
};
export const filterActivities = (payload) => {
  return {
    type: FILTER_ACTIVITIES,
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
