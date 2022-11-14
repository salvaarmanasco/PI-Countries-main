import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getCountries, postActivities } from "../Actions";
import styles from "../Styles/ActivityCreate.module.css";
import { useDispatch, useSelector } from "react-redux";

export function ActivityCreate() {
  const history = useHistory();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  countries.sort((o1, o2) => {
    if (o1.name < o2.name) {
      return -1;
    } else if (o1.name > o2.name) {
      return 1;
    } else {
      return 0;
    }
  });

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: [],
  });

  const [errors, setErrors] = useState({});
  //-----------------------------------------------Validator-----------------------------------------------------//
  function validate(input) {
    let errors = {};
    const regexName = /^[A-z ,í-ñ-Ü-ü]{3,20}$/;
    if (!input.name) {
      errors.name = "You need to assign a name to the activity";
    } else if (!regexName.test(input.name)) {
      errors.name =
        "The name of the activity must contain only letters, be greater than 3 characters and less than 20";
    }

    if (!input.difficulty) {
      errors.difficulty = "You need to assign a difficulty to the activity";
    } else if (input.difficulty < 1 || input.difficulty > 5) {
      errors.difficulty = "This field is out of the required range";
    }

    if (input.season == "") {
      errors.season = "You need to assign a season to create the activity";
    }

    if (!input.duration) {
      errors.duration = "You need to assign a duration to create the activity";
    }

    if (!input.country.length) {
      errors.country =
        "you need to add at least one country to create the activity";
    }
    return errors;
  }

  //-------------------------------------------------Use Effect------------------------------------------------//
  useEffect(() => {
    dispatch(getCountries());
  }, []);

  //---------------------------------------------Handles-------------------------------------------------------//

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectCountries = (e) => {
    setInput({
      ...input,
      country: input.country.includes(e.target.value)
        ? [...input.country]
        : [...input.country, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        country: [...input.country, e.target.value],
      })
    );
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      country: input.country.filter((c) => c !== e),
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !input.name ||
      input.name.length > 20 ||
      input.name.length < 3 ||
      input.difficulty < 1 ||
      input.difficulty > 5 ||
      !input.duration ||
      !input.season ||
      !input.country.length
    ) {
      return alert("You must complete all required items");
    } else {
      if (input.country.length > 1) {
        const act = [];
        let filterIC = input.country.filter((item, index) => {
          return input.country.indexOf(item) === index;
        });
        for (let i = 0; i < filterIC.length; i++) {
          act.push({
            name: input.name,
            difficulty: input.difficulty,
            duration: input.duration,
            season: input.season,
            country: [input.country[i]],
          });
        }
        for (let i = 0; i < act.length; i++) {
          dispatch(postActivities(act[i]));
        }
        alert("The activity was created successfully");
        history.push("/home");
      } else {
        dispatch(postActivities(input));
        alert("The activity was created successfully");
        history.push("/home");
      }
    }
  }

  //---------------------------------------------------------------------------------------------------------//

  return (
    <div>
      <div className={styles.inicio}>
        <h1>ACTIVITY CREATE</h1>
      </div>
      <div className={styles.inicio}>
        <Link to="/home" className={styles.createAct}>
          Back
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.header}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div className={styles.header}>
              <label>Difficulty</label>
              <select
                name="difficulty"
                value={input.difficulty}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Choose the difficulty</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {errors.difficulty && <p>{errors.difficulty}</p>}
            </div>
            <div className={styles.header}>
              <label>Duration</label>
              <input
                onChange={(e) => handleChange(e)}
                type="number"
                name="duration"
                value={input.duration}
                min="1"
                step="1"
                placeholder="Choose the duration"
              />
              {errors.duration && <p>{errors.duration}</p>}
            </div>
            <div className={styles.header}>
              <label>Season</label>
              <select
                name="season"
                value={input.season}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Choose the season</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
                <option value="Autumn">Fall</option>
                <option value="Spring">Spring</option>
              </select>
              {errors.season && <p>{errors.season}</p>}
            </div>
            <div className={styles.header}>
              <label>Country</label>
              <select
                name="country"
                value={input.country}
                onChange={(e) => handleSelectCountries(e)}
              >
                <option>----</option>
                {countries.map((c, i) => (
                  <option key={i} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.country && <p>{errors.country}</p>}
            </div>
            <div className={styles.buttonSubmit}>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className={styles.countries}>
          <div>
            <h2>SELECTED COUNTRIES:</h2>
          </div>
          {input.country.map((e) => (
            <div className={styles.countrySelectedContainer}>
              <div>
                <h4 className={styles.countrySelected}>{e.toUpperCase()}</h4>
              </div>
              <div>
                <button
                  className={styles.tooltip}
                  onClick={() => handleDelete(e)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    height="25"
                    width="25"
                  >
                    <path
                      fill="#6361D9"
                      d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="tooltiptext"></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActivityCreate;
