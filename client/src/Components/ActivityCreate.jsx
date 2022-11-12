import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getCountries, postActivities } from "../Actions";
import styles from "../Styles/ActivityCreate.module.css";
import { useDispatch, useSelector } from "react-redux";

export function ActivityCreate() {
  const history = useHistory();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

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
        "The name of the activity must contain only letters, be greater than 4 characters and less than 20";
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

  //---------------------------------------------------------------------------------------------------------//
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
      country: [...input.country, e.target.value],
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
        for (let i = 0; i < input.country.length; i++) {
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
        <h1>Activity Create</h1>
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
                {countries.map((c, i) => (
                  <option key={i} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.country && <p>{errors.country}</p>}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className={styles.countries}>
          <h2>Paises seleccionados:</h2>
          {input.country.map((e) => (
            <div>
              <ul>
                <li>{e}</li>
              </ul>
              <button onClick={() => handleDelete(e)}>X</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActivityCreate;
