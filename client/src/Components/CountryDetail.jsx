import React from "react";
import styles from "../Styles/CardDetail.module.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetails, cleanDetails, getActivities } from "../Actions";
import ActivityCard from "./ActivityCard";

export default function CountryDetail(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const countryDetail = useSelector((state) => state.details);

  //-----------------------------------------------------------------------------------------------------------//
  // activities.forEach((elemento) => {
  //   console.log(elemento.Countries[0].id);
  //   console.log(elemento.Countries[0].name);
  // });

  //-----------------------------------------------------------------------------------------------------------//

  useEffect(() => {
    dispatch(getCountryDetails(props.match.params.id));
    // return () => {
    //   dispatch(cleanDetails());
    // };
  }, [props.match.params.id, dispatch]);

  const cleanSubmit = (e) => {
    e.preventDefault();
    history.push("/home");
  };

  //----------------------------------------------------------------------------------------------------------//
  return (
    <div>
      {countryDetail.length !== 0 && (
        <div className={styles.buttonContainer}>
          <button onClick={(e) => cleanSubmit(e)} className={styles.backButton}>
            Return to Home
          </button>
        </div>
      )}
      {countryDetail.length !== 0 ? (
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            <section className={styles.header}>
              <img src={countryDetail[0].flag} alt="Imagen no encontrada" />
              <h1>{countryDetail[0].name.toUpperCase()}</h1>
              <h2>{countryDetail[0].capital}</h2>
              <h4>Region: {countryDetail[0].region}</h4>
              <h4>Subregion: {countryDetail[0].subregion}</h4>
              <h4>Population: {countryDetail[0].population}</h4>
              <h4>Area: {countryDetail[0].area}km</h4>
              {countryDetail[0].Activities.length ? (
                countryDetail[0].Activities.map((e) => {
                  console.log(countryDetail[0].Activities);
                  return (
                    <>
                      <p>-------------------</p>
                      <ActivityCard
                        name={e.name}
                        difficulty={e.difficulty}
                        duration={e.duration}
                        season={e.season}
                        key={e.key}
                      />
                    </>
                  );
                })
              ) : (
                <div>hola</div>
              )}
            </section>
          </div>
        </div>
      ) : (
        <div className={styles.buttonContainer}>
          <div className={styles.buttonContainer2}>
            <button
              onClick={(e) => cleanSubmit(e)}
              className={styles.backButton}
            >
              Return to Home
            </button>
          </div>
          <div className={styles.h1Container}>
            <h1>Country not found</h1>
          </div>
        </div>
      )}
      {/* {countryDetail[0].Activities[0] &&
        countryDetail[0].Activities[0].map((a) => {
          return (
            <div>
              <div>
                <ActivityCard
                  name={a.name}
                  duration={a.duration}
                  difficulty={a.difficulty}
                  id={a.id}
                  season={a.season}
                />
              </div>
            </div>
          );
        })} */}
    </div>
  );
}
