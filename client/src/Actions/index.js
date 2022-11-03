import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_BYID = "GET_COUNTRY_BYID";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";

export const getCountries = () => async (dispatch) => {
  const response = await axios.get("http://localhost:3001/countries", {});
  return dispatch({ type: GET_COUNTRIES, payload: response.data });
};

// export const getCountriesById = () => async (dispatch) => {
//   const response = await axios("http://localhost:3001/countries/:id");
//   const countries = await response.json();
//   return dispatch({ type: GET_COUNTRY_BYID, payload: countries });
// };
